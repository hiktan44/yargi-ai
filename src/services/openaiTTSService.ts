import { supabase } from '../lib/supabase';

export class OpenAITTSService {
  private currentAudio: HTMLAudioElement | null = null;

  async generateSpeech(text: string): Promise<{ success: boolean; audioData?: string; error?: string }> {
    try {
      if (!text || text.trim() === '') {
        throw new Error('Metin gereklidir');
      }

      console.log('OpenAI TTS çağrılıyor...', { textLength: text.length });

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: text,
          voiceId: 'alloy' // OpenAI TTS varsayılan sesi
        }
      });

      if (error) {
        console.error('OpenAI TTS edge function hatası:', error);
        return { success: false, error: error.message };
      }

      if (!data.success) {
        console.warn('OpenAI TTS servisi başarısız:', data);
        return { success: false, error: data.message || 'OpenAI TTS servis hatası' };
      }

      return { 
        success: true, 
        audioData: data.audio 
      };
    } catch (error: any) {
      console.error('OpenAI TTS servis hatası:', error);
      return { 
        success: false, 
        error: error.message || 'OpenAI TTS servis hatası'
      };
    }
  }

  async playAudio(text: string): Promise<void> {
    try {
      // Mevcut ses çalıyorsa durdur
      this.stopAudio();

      // OpenAI TTS ile ses üret
      const result = await this.generateSpeech(text);
      
      if (!result.success || !result.audioData) {
        throw new Error(result.error || 'Ses üretilemedi');
      }

      // Base64 ses verisini decode et
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await this.base64ToAudioBuffer(result.audioData, audioContext);

      // Audio buffer'ı çal
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      this.currentAudio = {
        play: () => {
          source.start();
          return Promise.resolve();
        },
        pause: () => {},
        stop: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
        src: '',
        currentTime: 0,
        duration: 0,
        volume: 1,
        paused: false,
        ended: false,
        readyState: 0
      } as any;

      await this.currentAudio.play();
      source.onended = () => {
        this.currentAudio = null;
      };
      
      console.log('OpenAI TTS başarıyla çalındı');
    } catch (error: any) {
      console.error('OpenAI TTS çalma hatası:', error);
      throw new Error('OpenAI TTS çalınamıyor: ' + error.message);
    }
  }

  stopAudio(): void {
    if (this.currentAudio) {
      try {
        // AudioContext'i durdur
        // Note: In a real implementation, you'd track the audio context and stop it
        this.currentAudio = null;
        console.log('OpenAI TTS durduruldu');
      } catch (error) {
        console.warn('OpenAI TTS durdurma hatası:', error);
      }
    }
  }

  private async base64ToAudioBuffer(base64Data: string, audioContext: AudioContext): Promise<AudioBuffer> {
    try {
      // Base64 verisini binary data'ya çevir
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Audio buffer olarak decode et
      return await audioContext.decodeAudioData(bytes.buffer);
    } catch (error) {
      console.error('Audio decode hatası:', error);
      throw new Error('Ses verisi decode edilemedi');
    }
  }
}

// Singleton instance
export const openaiTTSService = new OpenAITTSService();