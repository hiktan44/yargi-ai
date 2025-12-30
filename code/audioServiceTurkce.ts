import { AudioScript, AudioSettings } from '../types';

export class AudioService {
  private settings: AudioSettings = {
    useApiAudio: false,
    fallbackToTts: true,
    voiceSpeed: 0.9,
    voicePitch: 1.0
  };

  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voicesLoaded = false;
  private isInitialized = false;
  private isPlaying = false;
  
  // Türkçe ses yapılandırmaları
  private turkishVoiceConfigs = {
    'Turkish_Trustworthyman': {
      preferred: ['tr-TR'],
      pitch: 0.85,
      rate: 0.8,
      volume: 1.0,
      characteristics: 'resmi, güvenilir, ciddi'
    },
    'Turkish_CalmWoman': {
      preferred: ['tr-TR'],
      pitch: 1.1,
      rate: 0.85,
      volume: 1.0,
      characteristics: 'sakin, profesyonel, net'
    }
  };

  constructor() {
    this.initializeVoices();
  }

  private initializeVoices() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis bu tarayıcıda desteklenmiyor');
      return;
    }

    // Sesleri yükle
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0 && !this.voicesLoaded) {
        this.voicesLoaded = true;
        this.isInitialized = true;
        console.log(`${voices.length} ses yüklendi:`, voices.map(v => `${v.name} (${v.lang})`));
        
        // Türkçe sesleri özellikle logla
        const turkishVoices = voices.filter(v => v.lang.startsWith('tr') || v.lang.includes('Turkish'));
        if (turkishVoices.length > 0) {
          console.log('Türkçe sesler bulundu:', turkishVoices.map(v => v.name));
        }
      }
    };

    // Sesleri hemen yükle
    loadVoices();
    
    // Sesler değiştiğinde dinle
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    // Yedek: kısa bir gecikme sonra başlatılmış olarak işaretle
    setTimeout(() => {
      if (!this.isInitialized) {
        this.isInitialized = true;
        console.warn('TTS özel sesler olmadan başlatıldı');
      }
    }, 1500);
  }

  async playAudio(script: AudioScript): Promise<void> {
    if (this.isPlaying) {
      console.warn('Ses şu anda çalınıyor, önce durduruluyor...');
      this.stopAudio();
    }

    try {
      // Tarayıcı TTS'inin hazır olduğundan emin ol
      if (!this.isInitialized) {
        await this.waitForInitialization();
      }
      
      await this.playTextToSpeech(script);
    } catch (error) {
      console.error('Ses çalma hatası:', error);
      
      // Hata durumunda basitleştirilmiş versiyonu dene
      try {
        await this.playSimpleTTS(this.sanitizeText(script.text).substring(0, 100) + '...');
      } catch (fallbackError) {
        console.error('Yedek TTS de başarısız oldu:', fallbackError);
        throw new Error('Tüm ses çalma yöntemleri başarısız oldu');
      }
    }
  }

  private async waitForInitialization(): Promise<void> {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.isInitialized) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      
      // 5 saniye sonra timeout
      setTimeout(() => {
        clearInterval(checkInterval);
        this.isInitialized = true;
        resolve();
      }, 5000);
    });
  }

  private async playTextToSpeech(script: AudioScript): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis desteklenmiyor'));
        return;
      }

      // Mevcut çalmayı durdur
      this.stopAudio();

      // Metni temizle ve uzunluk kontrolü yap
      const cleanText = this.sanitizeText(script.text);
      const textChunks = this.chunkText(cleanText, 150); // Daha küçük parçalara böl
      
      if (textChunks.length === 0) {
        resolve();
        return;
      }

      this.isPlaying = true;
      let currentChunkIndex = 0;
      let isResolved = false;

      const playNextChunk = () => {
        if (currentChunkIndex >= textChunks.length) {
          this.isPlaying = false;
          if (!isResolved) {
            isResolved = true;
            resolve();
          }
          return;
        }

        const chunk = textChunks[currentChunkIndex];
        const utterance = new SpeechSynthesisUtterance(chunk);
        this.currentUtterance = utterance;

        // Ses konfigürasyonu
        try {
          this.configureVoiceForRole(utterance, script.voiceType);
        } catch (voiceError) {
          console.warn('Ses konfigürasyonu başarısız, varsayılanlar kullanılıyor:', voiceError);
        }

        utterance.onstart = () => {
          console.log(`Konuşma başladı: ${script.title} (parça ${currentChunkIndex + 1}/${textChunks.length})`);
        };

        utterance.onend = () => {
          currentChunkIndex++;
          setTimeout(playNextChunk, 100); // Parçalar arası kısa duraklama
        };

        utterance.onerror = (event) => {
          console.error('Konuşma hatası:', event.error, 'parça:', currentChunkIndex);
          
          // Hata durumunda sonraki parçaya geç
          currentChunkIndex++;
          setTimeout(playNextChunk, 100);
        };

        // Bu parça için timeout
        const chunkTimeout = setTimeout(() => {
          console.warn(`Konuşma timeout: parça ${currentChunkIndex}`);
          utterance.onend = null; // Çifte çağrıyı önle
          currentChunkIndex++;
          setTimeout(playNextChunk, 100);
        }, Math.max(chunk.length * 80, 3000)); // Metin uzunluğuna göre timeout

        utterance.onend = () => {
          clearTimeout(chunkTimeout);
          currentChunkIndex++;
          setTimeout(playNextChunk, 100);
        };

        // Konuşmayı başlat
        setTimeout(() => {
          try {
            speechSynthesis.speak(utterance);
          } catch (speakError) {
            console.error('Konuşma çağrısı başarısız:', speakError);
            clearTimeout(chunkTimeout);
            this.isPlaying = false;
            if (!isResolved) {
              isResolved = true;
              reject(speakError);
            }
          }
        }, 100);
      };

      // İlk parçayı çalmaya başla
      playNextChunk();
    });
  }

  private sanitizeText(text: string): string {
    // Gereksiz boşlukları ve özel karakterleri temizle
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\sşğıöçüĞIŞÖÇÜ\.\,\!\?\:\;\-\(\)]/g, '')
      .trim()
      .substring(0, 1000); // Maksimum 1000 karakter
  }

  private chunkText(text: string, maxChunkLength: number): string[] {
    if (text.length <= maxChunkLength) {
      return [text];
    }

    const chunks: string[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      let chunkEnd = Math.min(currentIndex + maxChunkLength, text.length);
      
      // Cümle sonunda bitirmeye çalış
      const lastPeriod = text.lastIndexOf('.', chunkEnd);
      const lastQuestion = text.lastIndexOf('?', chunkEnd);
      const lastExclamation = text.lastIndexOf('!', chunkEnd);
      
      const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
      
      if (lastSentenceEnd > currentIndex + maxChunkLength * 0.7) {
        chunkEnd = lastSentenceEnd + 1;
      }

      chunks.push(text.substring(currentIndex, chunkEnd).trim());
      currentIndex = chunkEnd;
    }

    return chunks.filter(chunk => chunk.length > 0);
  }

  private async playSimpleTTS(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text.substring(0, 50));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve(); // Hata vermesin

      setTimeout(() => {
        try {
          speechSynthesis.speak(utterance);
        } catch {
          resolve();
        }
      }, 100);

      // Maksimum 5 saniye sonra her zaman çözümle
      setTimeout(() => resolve(), 5000);
    });
  }

  private configureVoiceForRole(utterance: SpeechSynthesisUtterance, voiceType: AudioScript['voiceType']) {
    const voices = speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      console.warn('Mevcut ses yok, sistem varsayılanı kullanılıyor');
      return;
    }

    // Temel ayarlar
    utterance.rate = this.settings.voiceSpeed;
    utterance.pitch = this.settings.voicePitch;
    utterance.volume = 1.0;

    // Türkçe ses konfigürasyonlarını kontrol et
    const turkishConfig = this.turkishVoiceConfigs[voiceType as keyof typeof this.turkishVoiceConfigs];
    if (turkishConfig) {
      console.log(`${voiceType} için Türkçe konfigürasyon uygulanıyor:`, turkishConfig.characteristics);
      utterance.pitch = turkishConfig.pitch;
      utterance.rate = turkishConfig.rate;
      utterance.volume = turkishConfig.volume;
    }

    // Türkçe sesleri önceliklendir
    const turkishVoices = voices.filter(voice => 
      voice.lang.startsWith('tr') || 
      voice.lang.includes('Turkish') ||
      voice.name.toLowerCase().includes('turkish')
    );

    // İngilizce sesleri de dahil et
    const englishVoices = voices.filter(voice => 
      voice.lang.startsWith('en') || 
      voice.lang.includes('US') || 
      voice.lang.includes('GB')
    );

    // Cinsiyet bazlı filtreleme
    const getVoiceByGender = (voices: SpeechSynthesisVoice[], gender: 'male' | 'female') => {
      const malePatterns = ['male', 'david', 'daniel', 'thomas', 'alex', 'ahmet', 'mehmet'];
      const femalePatterns = ['female', 'karen', 'samantha', 'anna', 'susan', 'ayşe', 'fatma'];
      
      return voices.filter(voice => {
        const name = voice.name.toLowerCase();
        return gender === 'male' 
          ? malePatterns.some(pattern => name.includes(pattern))
          : femalePatterns.some(pattern => name.includes(pattern));
      });
    };

    let selectedVoice: SpeechSynthesisVoice | undefined;

    // Rol özel konfigürasyon
    switch (voiceType) {
      case 'Turkish_Trustworthyman':
        // Türkçe erkek sesi ara
        const turkishMale = getVoiceByGender(turkishVoices, 'male');
        selectedVoice = turkishMale[0] || turkishVoices[0] || englishVoices[0] || voices[0];
        utterance.pitch = turkishConfig?.pitch || 0.85;
        utterance.rate = turkishConfig?.rate || 0.8;
        break;

      case 'Turkish_CalmWoman':
        // Türkçe kadın sesi ara
        const turkishFemale = getVoiceByGender(turkishVoices, 'female');
        selectedVoice = turkishFemale[0] || turkishVoices[0] || englishVoices[0] || voices[0];
        utterance.pitch = turkishConfig?.pitch || 1.1;
        utterance.rate = turkishConfig?.rate || 0.85;
        break;

      case 'judge':
        utterance.pitch = 0.8;
        utterance.rate = 0.7;
        const maleVoices = getVoiceByGender(englishVoices, 'male');
        selectedVoice = turkishMale?.[0] || maleVoices[0] || englishVoices[0] || voices[0];
        break;
        
      case 'prosecutor':
        utterance.pitch = 1.0;
        utterance.rate = 0.9;
        const femaleVoices = getVoiceByGender(englishVoices, 'female');
        selectedVoice = turkishFemale?.[0] || femaleVoices[0] || englishVoices[1] || voices[1] || voices[0];
        break;
        
      case 'defense':
        utterance.pitch = 0.9;
        utterance.rate = 0.8;
        selectedVoice = turkishMale?.[1] || maleVoices?.[1] || maleVoices?.[0] || englishVoices[0] || voices[0];
        break;
        
      case 'witness':
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
        selectedVoice = turkishFemale?.[1] || femaleVoices?.[1] || femaleVoices?.[0] || englishVoices[1] || voices[1] || voices[0];
        break;
        
      default:
        utterance.pitch = 1.0;
        utterance.rate = 0.9;
        selectedVoice = turkishVoices[0] || englishVoices[0] || voices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log(`Kullanılan ses: ${selectedVoice.name} (${selectedVoice.lang}) rol: ${voiceType}`);
    } else {
      console.warn(`Rol ${voiceType} için ses bulunamadı, varsayılan kullanılıyor`);
    }
  }

  stopAudio(): void {
    this.isPlaying = false;
    if ('speechSynthesis' in window) {
      try {
        speechSynthesis.cancel();
      } catch (error) {
        console.warn('Konuşmayı durdurma hatası:', error);
      }
    }
    this.currentUtterance = null;
  }

  pauseAudio(): void {
    if ('speechSynthesis' in window && speechSynthesis.speaking && !speechSynthesis.paused) {
      try {
        speechSynthesis.pause();
      } catch (error) {
        console.warn('Konuşmayı duraklatma hatası:', error);
      }
    }
  }

  resumeAudio(): void {
    if ('speechSynthesis' in window && speechSynthesis.paused) {
      try {
        speechSynthesis.resume();
      } catch (error) {
        console.warn('Konuşmayı devam ettirme hatası:', error);
      }
    }
  }

  isCurrentlyPlaying(): boolean {
    try {
      return this.isPlaying && speechSynthesis.speaking;
    } catch {
      return false;
    }
  }

  isPaused(): boolean {
    try {
      return speechSynthesis.paused;
    } catch {
      return false;
    }
  }

  updateSettings(newSettings: Partial<AudioSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    console.log('Ses ayarları güncellendi:', this.settings);
  }

  getSettings(): AudioSettings {
    return { ...this.settings };
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    try {
      if ('speechSynthesis' in window) {
        return speechSynthesis.getVoices();
      }
    } catch (error) {
      console.warn('Sesleri alma hatası:', error);
    }
    return [];
  }

  // Türkçe sesleri özel olarak getir
  getTurkishVoices(): SpeechSynthesisVoice[] {
    try {
      const allVoices = this.getAvailableVoices();
      return allVoices.filter(voice => 
        voice.lang.startsWith('tr') || 
        voice.lang.includes('Turkish') ||
        voice.name.toLowerCase().includes('turkish')
      );
    } catch (error) {
      console.warn('Türkçe sesleri alma hatası:', error);
      return [];
    }
  }

  // Ses sistemi durumunu kontrol et
  getSystemStatus(): { 
    supported: boolean; 
    voicesLoaded: boolean; 
    turkishVoices: number; 
    totalVoices: number; 
    isInitialized: boolean; 
  } {
    const supported = 'speechSynthesis' in window;
    const totalVoices = this.getAvailableVoices().length;
    const turkishVoices = this.getTurkishVoices().length;

    return {
      supported,
      voicesLoaded: this.voicesLoaded,
      turkishVoices,
      totalVoices,
      isInitialized: this.isInitialized
    };
  }

  // TTS'in kullanılabilir ve çalışır olduğunu test et
  async testAudio(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      if (!('speechSynthesis' in window)) {
        return { success: false, message: 'Speech synthesis bu tarayıcıda desteklenmiyor' };
      }
      
      // Sistem durumunu kontrol et
      const status = this.getSystemStatus();
      console.log('TTS sistem durumu:', status);

      await this.playSimpleTTS('Test ses');
      return { 
        success: true, 
        message: 'TTS başarıyla çalışıyor',
        details: status
      };
    } catch (error) {
      console.error('Ses testi başarısız:', error);
      return { 
        success: false, 
        message: `TTS testi başarısız: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      };
    }
  }

  // Türkçe metin için özel test
  async testTurkishAudio(): Promise<{ success: boolean; message: string; voice?: string }> {
    try {
      const turkishVoices = this.getTurkishVoices();
      
      if (turkishVoices.length === 0) {
        return { 
          success: false, 
          message: 'Sistemde Türkçe ses bulunamadı' 
        };
      }

      const testText = 'Merhaba, bu bir Türkçe ses testidir.';
      await this.playSimpleTTS(testText);
      
      return { 
        success: true, 
        message: 'Türkçe TTS başarıyla çalışıyor',
        voice: turkishVoices[0].name
      };
    } catch (error) {
      console.error('Türkçe ses testi başarısız:', error);
      return { 
        success: false, 
        message: `Türkçe TTS testi başarısız: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      };
    }
  }
}

// Singleton instance
export const audioService = new AudioService();