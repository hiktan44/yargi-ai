import { supabase } from '../lib/supabase';

export interface TTSResponse {
  success: boolean;
  useNativeTTS: boolean;
  audio?: string;
  contentType?: string;
  duration?: number;
  message?: string;
  text?: string;
}

export class ElevenLabsService {
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;

  async generateSpeech(text: string, voiceId: string = 'pNInz6obpgDQGcFmaJgB'): Promise<TTSResponse> {
    try {
      // Backend TTS servisini çağır
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voiceId }
      });

      if (error) {
        console.error('TTS servisi hatası:', error);
        return {
          success: false,
          useNativeTTS: true,
          message: 'Backend TTS servisi kullanılamıyor',
          text
        };
      }

      return data as TTSResponse;
    } catch (error) {
      console.error('ElevenLabs servisi hatası:', error);
      return {
        success: false,
        useNativeTTS: true,
        message: 'TTS servisi bağlantı hatası',
        text
      };
    }
  }

  async playAudio(text: string): Promise<void> {
    try {
      // Önce TTS servisinden ses al
      const ttsResponse = await this.generateSpeech(text);

      if (ttsResponse.useNativeTTS || !ttsResponse.success) {
        // Native TTS'e fallback
        throw new Error('ElevenLabs kullanılamıyor, native TTS kullanılacak');
      }

      if (!ttsResponse.audio) {
        throw new Error('Ses verisi alınamadı');
      }

      // Base64'ten audio oluştur
      const audioBlob = this.base64ToBlob(ttsResponse.audio, ttsResponse.contentType || 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);

      // Önceki sesi durdur
      this.stopAudio();

      // Yeni audio elementi oluştur
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      this.isPlaying = true;

      // Event listeners
      audio.onended = () => {
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (error) => {
        console.error('Ses çalma hatası:', error);
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
      };

      // Sesi çal
      await audio.play();
      
    } catch (error) {
      console.error('Audio çalma hatası:', error);
      this.isPlaying = false;
      throw error;
    }
  }

  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.isPlaying = false;
  }

  pauseAudio(): void {
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }

  resumeAudio(): void {
    if (this.currentAudio && !this.isPlaying) {
      this.currentAudio.play();
      this.isPlaying = true;
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}

export const elevenLabsService = new ElevenLabsService();
