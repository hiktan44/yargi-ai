import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  BarChart, 
  Users, 
  Clock, 
  Lightbulb, 
  StopCircle, 
  AlertCircle,
  FileText,
  Gavel,
  UserCheck,
  BookOpen
} from 'lucide-react';

// Türkçe hukuki metin tipleri
export type TurkishVoiceType = 
  | 'hakim' 
  | 'savci' 
  | 'avukat' 
  | 'tanik' 
  | 'uzman' 
  | 'degisken';

// Türkçe hukuki doküman tipleri
export interface TurkishLegalDocument {
  id: string;
  title: string;
  content: string;
  documentType: 'anayasa' | 'kanun' | 'yönetmelik' | 'anlasma' | 'mahkeme_karari' | 'iddianame';
  lawField: 'anayasa' | 'ceza' | 'medeni' | 'ticaret' | 'idari' | 'is';
  article?: string;
  section?: string;
  relevanceScore: number;
  summary: string;
  keyPoints: string[];
  isActive: boolean;
}

// Tanık analizi için Türkçe veri
export interface TurkishWitness {
  id: string;
  name: string;
  witnessType: 'savunma_taniği' | 'savcılık_taniği' | 'bagimsiz_tanik' | 'uzman_tanik';
  credibilityScore: number;
  statement: string;
  contradictions: string[];
  supportingEvidence: string[];
  crossExaminationNotes: string;
}

// Zaman çizelgesi olayları
export interface TurkishTimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  legalSignificance: 'yuksek' | 'orta' | 'dusuk' | 'belirsiz';
  evidence: string[];
  participants: string[];
  legalBasis: string;
}

// Senaryo analizi
export interface TurkishScenarioAnalysis {
  id: string;
  scenario: string;
  probability: number;
  legalBasis: string;
  evidence: string[];
  consequences: string[];
  applicableLaws: string[];
}

const TurkishAudioComponent: React.FC = () => {
  // Temel state yönetimi
  const [activeSection, setActiveSection] = useState<'dokuman' | 'tanik' | 'zaman' | 'senaryo'>('dokuman');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [selectedVoiceType, setSelectedVoiceType] = useState<TurkishVoiceType>('degisken');

  // Ses durumu yönetimi
  const [speechSynthesis] = useState(() => 
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Mock Türkçe hukuki dokümanlar
  const mockTurkishDocuments: TurkishLegalDocument[] = [
    {
      id: 'anayasa-madde-13',
      title: 'Anayasa - Temel Haklar ve Hürriyetler',
      documentType: 'anayasa',
      lawField: 'anayasa',
      article: 'Madde 13',
      content: 'Temel hak ve hürriyetler, özlerine dokunulmaksızın gerçekleştirilir. Bu hürriyetler demokratik toplum düzeninin gereklerine aykırı olarak ve ölçülülük ilkesi üzerinden kötüye kullanılamaz.',
      relevanceScore: 95,
      summary: 'Temel hakların kullanımı ve sınırları konusunda anayasal düzenleme',
      keyPoints: ['Hakların özü', 'Demokratik düzen', 'Ölçülülük ilkesi', 'Kötüye kullanma yasağı'],
      isActive: true
    },
    {
      id: 'ceza-kanunu-madde-257',
      title: 'Türk Ceza Kanunu - Görevi Kötüye Kullanma',
      documentType: 'kanun',
      lawField: 'ceza',
      article: 'Madde 257',
      content: 'Kamusal bir görevin kamu adına bizzat veya başkaları ile birlikte ifa eden kişi, bu görevi nedeniyle kendisine veya bir başkasına yarar sağlamak veya zarar vermek amacıyla, görevin gereklerine aykırı olarak hareket ederse, bir yıldan beş yıla kadar hapis cezası ile cezalandırılır.',
      relevanceScore: 88,
      summary: 'Kamu görevlilerinin görevi kötüye kullanma suçu düzenlemesi',
      keyPoints: ['Kamu görevi', 'Yarar sağlama amacı', 'Görevin gereklerine aykırılık', 'Hapis cezası'],
      isActive: true
    },
    {
      id: 'medeni-kanun-madde-6',
      title: 'Türk Medeni Kanunu - Hukuki İşlemler',
      documentType: 'kanun',
      lawField: 'medeni',
      article: 'Madde 6',
      content: 'Bir işlemin hukuki sonuç doğurması, işlemin konusu ile kastedilen sonuçlara göre belirlenir. İşlemin yapıldığı sırada taraflar veya temsilci iradesi ile belirlenmiş olan hüküm ve şartlar, hukuki işlemin içeriğini oluşturur.',
      relevanceScore: 82,
      summary: 'Hukuki işlemlerin içeriğinin belirlenmesi',
      keyPoints: ['İrade beyanı', 'Hukuki sonuç', 'Temsilci', 'İçerik belirleme'],
      isActive: true
    }
  ];

  // Mock tanık analizi
  const mockTurkishWitnesses: TurkishWitness[] = [
    {
      id: 'tanik-1',
      name: 'Ahmet Yılmaz - Güvenlik Görevlisi',
      witnessType: 'uzman_tanik',
      credibilityScore: 89,
      statement: 'Olay tarihinde saat 14:30 civarında belirtilen bölgede güvenlik kontrolü yapmaktaydım. Tüm güvenlik prosedürlerine uygun olarak görevimi ifa ettim.',
      contradictions: [],
      supportingEvidence: ['Güvenlik kamerası kayıtları', 'Görev defteri kayıtları'],
      crossExaminationNotes: 'Cevapları net ve tutarlı. Teknik detaylarda tereddüt yaşamadı.'
    },
    {
      id: 'tanik-2',
      name: 'Fatma Kaya - Olay Tanığı',
      witnessType: 'bagimsiz_tanik',
      credibilityScore: 76,
      statement: 'Olay esnasında yaklaşık 50 metre mesafeden gördüğüm kadarıyla beklenmedik bir durum yaşandı. Detayları net hatırlamıyorum.',
      contradictions: ['Diğer tanıklarla saat farkı', 'Mesafe tahmininde tutarsızlık'],
      supportingEvidence: ['Şahitlik beyanı'],
      crossExaminationNotes: 'Stres altında ifade verdi. Bazı detaylarda belirsizlik var.'
    }
  ];

  // Mock zaman çizelgesi
  const mockTurkishTimeline: TurkishTimelineEvent[] = [
    {
      id: 'event-1',
      timestamp: '14:25',
      event: 'İlk güvenlik kontrolü tamamlandı',
      legalSignificance: 'dusuk',
      evidence: ['Kontrol listesi', 'İmza kayıtları'],
      participants: ['Güvenlik Görevlisi A. Yılmaz'],
      legalBasis: 'İş güvenliği prosedürleri'
    },
    {
      id: 'event-2',
      timestamp: '14:30',
      event: 'Olay gerçekleşti',
      legalSignificance: 'yuksek',
      evidence: ['Tanık ifadeleri', 'Güvenlik kamera kayıtları', 'Olay yeri incelemesi'],
      participants: ['Mağdur', 'Şüpheli', 'Tanık F. Kaya'],
      legalBasis: 'Ceza kanunu maddeleri'
    },
    {
      id: 'event-3',
      timestamp: '14:32',
      event: 'İlk yardım müdahalesi',
      legalSignificance: 'orta',
      evidence: ['Ambulans kayıtları', 'Hastane raporları'],
      participants: ['İlk yardım ekibi'],
      legalBasis: 'Sağlık mevzuatı'
    }
  ];

  // Mock senaryo analizi
  const mockTurkishScenarios: TurkishScenarioAnalysis[] = [
    {
      id: 'scenario-1',
      scenario: 'Sorumluluk tespiti - İşveren kusurlu',
      probability: 73,
      legalBasis: 'İş sağlığı ve güvenliği mevzuatı',
      evidence: ['Eksik güvenlik önlemleri', 'Prosedür ihlalleri', 'Önceki uyarılar'],
      consequences: ['Maddi tazminat', 'Manevi tazminat', 'Adli para cezası'],
      applicableLaws: ['İş Sağlığı ve Güvenliği Kanunu', 'Türk Borçlar Kanunu']
    },
    {
      id: 'scenario-2',
      scenario: 'Kısmi sorumluluk paylaşımı',
      probability: 45,
      legalBasis: 'Kusur paylaşımı ilkeleri',
      evidence: ['Mağdur dikkatsizliği', 'Üçüncü şahıs etkisi', 'Mücbir sebep'],
      consequences: ['Azaltılmış tazminat', 'Paylaşılan sorumluluk'],
      applicableLaws: ['Türk Borçlar Kanunu', 'Haksız Fiiller']
    },
    {
      id: 'scenario-3',
      scenario: 'Sorumluluk bulunmaması - Mücbir sebep',
      probability: 28,
      legalBasis: 'Mücbir sebep doktrini',
      evidence: ['Öngörülemeyen durum', 'Kaçınılmaz olay', 'Dış faktör etkisi'],
      consequences: ['Sorumluluk reddi', 'Sigorta ödemeleri'],
      applicableLaws: ['Türk Borçlar Kanunu', 'Sözleşmeler Hukuku']
    }
  ];

  // Ses yönetimi
  useEffect(() => {
    if (speechSynthesis) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        const turkishVoices = voices.filter(voice => 
          voice.lang.startsWith('tr') || 
          voice.name.toLowerCase().includes('turkish')
        );
        setAvailableVoices(turkishVoices);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [speechSynthesis]);

  // Türkçe metin için ses ayarları
  const getTurkishVoiceSettings = (voiceType: TurkishVoiceType) => {
    const settings = {
      hakim: { rate: 0.9, pitch: 0.8, volume: 1.0, tone: 'ciddi' },
      savci: { rate: 0.95, pitch: 0.9, volume: 1.0, tone: 'resmi' },
      avukat: { rate: 1.0, pitch: 1.0, volume: 0.95, tone: 'savunmacı' },
      tanik: { rate: 1.05, pitch: 1.1, volume: 0.9, tone: 'doğal' },
      uzman: { rate: 0.9, pitch: 0.85, volume: 0.95, tone: 'teknik' },
      degisken: { rate: 1.0, pitch: 1.0, volume: 1.0, tone: 'standart' }
    };
    return settings[voiceType];
  };

  // Ses çalma fonksiyonu
  const playTurkishAudio = async (
    audioId: string, 
    content: string, 
    voiceType: TurkishVoiceType = 'degisken',
    category: string = 'genel'
  ) => {
    if (!audioEnabled || !speechSynthesis) return;

    try {
      setIsLoading(true);
      setPlayingAudioId(audioId);
      setAudioError(null);

      // Türkçe karakter temizleme
      const cleanContent = content
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ö/g, 'o')
        .replace(/ı/g, 'i');

      // Speech Synthesis utterance oluşturma
      const utterance = new SpeechSynthesisUtterance(cleanContent);
      
      // Ses ayarları
      const voiceSettings = getTurkishVoiceSettings(voiceType);
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      // Türkçe ses seçimi
      const turkishVoice = availableVoices.find(voice => 
        voice.lang.startsWith('tr') || voice.name.includes('Turkish')
      );
      if (turkishVoice) {
        utterance.voice = turkishVoice;
      }

      // Event listeners
      utterance.onerror = (event) => {
        console.error('Ses hatası:', event.error);
        setAudioError(`Ses çalma hatası: ${event.error}`);
      };

      utterance.onend = () => {
        setPlayingAudioId(null);
        setIsLoading(false);
      };

      // Çalma
      speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('Audio playback failed:', error);
      setAudioError('Ses çalma işlemi başarısız oldu');
      setIsLoading(false);
    }
  };

  // Doküman ses çalma
  const playDocumentAudio = async (document: TurkishLegalDocument) => {
    const content = `${document.title}. ${document.summary}. Temel noktalar: ${document.keyPoints.join(', ')}.`;
    await playTurkishAudio(document.id, content, 'uzman', 'dokuman');
  };

  // Tanık analizi ses çalma
  const playWitnessAudio = async (witness: TurkishWitness) => {
    let content = `${witness.name} tanık ifadesi. Güvenilirlik puanı ${witness.credibilityScore} yüzde. `;
    content += `İfade: ${witness.statement}. `;
    
    if (witness.contradictions.length > 0) {
      content += `Çelişkiler: ${witness.contradictions.join(', ')}. `;
    }
    
    if (witness.supportingEvidence.length > 0) {
      content += `Destekleyici deliller: ${witness.supportingEvidence.join(', ')}.`;
    }

    const voiceType = witness.witnessType === 'uzman_tanik' ? 'uzman' : 'tanik';
    await playTurkishAudio(witness.id, content, voiceType, 'tanik');
  };

  // Zaman çizelgesi ses çalma
  const playTimelineAudio = async (event: TurkishTimelineEvent) => {
    const content = `${event.timestamp} saatinde gerçekleşen olay: ${event.event}. Hukuki önem derecesi: ${event.legalSignificance}. Katılımcılar: ${event.participants.join(', ')}.`;
    await playTurkishAudio(event.id, content, 'degisken', 'zaman');
  };

  // Senaryo analizi ses çalma
  const playScenarioAudio = async (scenario: TurkishScenarioAnalysis) => {
    const content = `${scenario.scenario} senaryosu. Gerçekleşme olasılığı ${scenario.probability} yüzde. Hukuki dayanak: ${scenario.legalBasis}. Uygulanabilir yasalar: ${scenario.applicableLaws.join(', ')}.`;
    await playTurkishAudio(scenario.id, content, 'hakim', 'senaryo');
  };

  // Ses durdurma
  const stopAudio = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    setPlayingAudioId(null);
    setIsLoading(false);
  };

  // Bölüm verileri
  const sections = [
    { id: 'dokuman', label: 'Hukuki Dokümanlar', icon: FileText },
    { id: 'tanik', label: 'Tanık Analizi', icon: UserCheck },
    { id: 'zaman', label: 'Olay Zaman Çizelgesi', icon: Clock },
    { id: 'senaryo', label: 'Hukuki Senaryolar', icon: Gavel }
  ];

  // Dokümanlar bölümü
  const renderDocumentsSection = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Türkçe Hukuki Dokümanlar</h3>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedVoiceType}
            onChange={(e) => setSelectedVoiceType(e.target.value as TurkishVoiceType)}
            className="bg-gray-700 text-white rounded px-3 py-2 text-sm"
          >
            <option value="degisken">Değişken Ses</option>
            <option value="hakim">Hakim Sesi</option>
            <option value="avukat">Avukat Sesi</option>
            <option value="uzman">Uzman Sesi</option>
          </select>
          {audioEnabled && (
            <button
              onClick={() => playTurkishAudio(
                'documents-overview', 
                'Türk hukuk sistemi doküman analizi. Anayasa, kanun ve yönetmeliklerden seçilmiş maddeler içerik analizi için hazırlandı.',
                selectedVoiceType,
                'dokuman'
              )}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-lg transition-colors"
            >
              {isLoading && playingAudioId === 'documents-overview' ? (
                <StopCircle className="h-4 w-4 text-white animate-spin" />
              ) : (
                <Play className="h-4 w-4 text-white" />
              )}
              <span className="text-sm text-white">Analizi Çal</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTurkishDocuments.map((document) => (
          <div key={document.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-white text-lg mb-1">{document.title}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">{document.lawField}</span>
                  {document.article && (
                    <span className="bg-blue-700 px-2 py-1 rounded">{document.article}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-400">{document.relevanceScore}%</div>
                  <div className="text-xs text-gray-400">İlişki</div>
                </div>
                {audioEnabled && (
                  <button
                    onClick={() => playDocumentAudio(document)}
                    disabled={isLoading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-full transition-colors"
                    title="Dokümanı seslendir"
                  >
                    {isLoading && playingAudioId === document.id ? (
                      <Pause className="h-3 w-3 text-white" />
                    ) : (
                      <Play className="h-3 w-3 text-white" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{document.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {document.keyPoints.slice(0, 4).map((point, index) => (
                <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                  {point}
                </span>
              ))}
            </div>
            <div className="p-3 bg-gray-700 rounded text-sm">
              <div className="text-blue-400 font-medium mb-1">İçerik Önizleme:</div>
              <div className="text-gray-300 line-clamp-3">{document.content.substring(0, 120)}...</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Tanık analizi bölümü
  const renderWitnessSection = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Tanık İfadeleri ve Analiz</h3>
        {audioEnabled && (
          <button
            onClick={() => playTurkishAudio(
              'witness-overview',
              'Tanık ifadeleri analizi. Güvenilirlik değerlendirmesi, çelişki tespiti ve destekleyici deliller incelendi.',
              'tanik',
              'tanik'
            )}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-lg transition-colors"
          >
            {isLoading && playingAudioId === 'witness-overview' ? (
              <StopCircle className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
            <span className="text-sm text-white">Analizi Çal</span>
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {mockTurkishWitnesses.map((witness) => (
          <div key={witness.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-white text-lg mb-1">{witness.name}</h4>
                <div className="text-sm text-gray-400">
                  <span className="bg-gray-700 px-2 py-1 rounded">{witness.witnessType.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    witness.credibilityScore >= 80 ? 'text-green-400' :
                    witness.credibilityScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {witness.credibilityScore}%
                  </div>
                  <div className="text-xs text-gray-400">Güvenilirlik</div>
                </div>
                {audioEnabled && (
                  <button
                    onClick={() => playWitnessAudio(witness)}
                    disabled={isLoading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-full transition-colors"
                    title="Tanık ifadesini seslendir"
                  >
                    {isLoading && playingAudioId === witness.id ? (
                      <Pause className="h-3 w-3 text-white" />
                    ) : (
                      <Play className="h-3 w-3 text-white" />
                    )}
                  </button>
                )}
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-gray-700 rounded">
              <h5 className="text-sm font-medium text-blue-400 mb-2">İfade:</h5>
              <p className="text-gray-300 text-sm">{witness.statement}</p>
            </div>

            {witness.contradictions.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-red-400 mb-2">Çelişkiler:</h5>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {witness.contradictions.map((contradiction, index) => (
                    <li key={index}>{contradiction}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <h5 className="text-sm font-medium text-green-400 mb-2">Destekleyici Deliller:</h5>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {witness.supportingEvidence.map((evidence, index) => (
                  <li key={index}>{evidence}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-3 bg-gray-700 rounded">
              <h5 className="text-sm font-medium text-yellow-400 mb-1">Çapraz Sorgu Notları:</h5>
              <p className="text-xs text-gray-300">{witness.crossExaminationNotes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Zaman çizelgesi bölümü
  const renderTimelineSection = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Olay Zaman Çizelgesi</h3>
        {audioEnabled && (
          <button
            onClick={() => playTurkishAudio(
              'timeline-overview',
              'Olay zaman çizelgesi analizi. Kritik zaman noktaları, hukuki önem dereceleri ve delil değerlendirmesi tamamlandı.',
              'degisken',
              'zaman'
            )}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-lg transition-colors"
          >
            {isLoading && playingAudioId === 'timeline-overview' ? (
              <StopCircle className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
            <span className="text-sm text-white">Analizi Çal</span>
          </button>
        )}
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
        
        <div className="space-y-8">
          {mockTurkishTimeline.map((event) => (
            <div key={event.id} className="relative flex items-start">
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                event.legalSignificance === 'yuksek' ? 'bg-red-600 border-red-400' :
                event.legalSignificance === 'orta' ? 'bg-yellow-600 border-yellow-400' :
                event.legalSignificance === 'dusuk' ? 'bg-green-600 border-green-400' :
                'bg-gray-600 border-gray-400'
              }`}>
                <Clock className="h-6 w-6 text-white" />
              </div>
              
              <div className="ml-6 bg-gray-800 rounded-lg p-4 border border-gray-700 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{event.timestamp}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.legalSignificance === 'yuksek' ? 'bg-red-900 text-red-200' :
                      event.legalSignificance === 'orta' ? 'bg-yellow-900 text-yellow-200' :
                      event.legalSignificance === 'dusuk' ? 'bg-green-900 text-green-200' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {event.legalSignificance}
                    </span>
                    {audioEnabled && (
                      <button
                        onClick={() => playTimelineAudio(event)}
                        disabled={isLoading}
                        className="p-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded transition-colors"
                        title="Zaman çizelgesi olayını seslendir"
                      >
                        {isLoading && playingAudioId === event.id ? (
                          <Pause className="h-3 w-3 text-white" />
                        ) : (
                          <Play className="h-3 w-3 text-white" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{event.event}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="text-blue-400 font-medium mb-1">Katılımcılar:</h6>
                    <p className="text-gray-300">{event.participants.join(', ')}</p>
                  </div>
                  <div>
                    <h6 className="text-green-400 font-medium mb-1">Deliller:</h6>
                    <p className="text-gray-300">{event.evidence.join(', ')}</p>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-gray-700 rounded text-xs">
                  <span className="text-purple-400 font-medium">Hukuki Dayanak: </span>
                  <span className="text-gray-300">{event.legalBasis}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Senaryo analizi bölümü
  const renderScenarioSection = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Hukuki Senaryo Analizi</h3>
        {audioEnabled && (
          <button
            onClick={() => playTurkishAudio(
              'scenario-overview',
              'Hukuki senaryo analizi tamamlandı. Olası sonuçlar, hukuki dayanaklar ve uygulanabilir kanun maddeleri değerlendirildi.',
              'hakim',
              'senaryo'
            )}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-lg transition-colors"
          >
            {isLoading && playingAudioId === 'scenario-overview' ? (
              <StopCircle className="h-4 w-4 text-white animate-spin" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
            <span className="text-sm text-white">Analizi Çal</span>
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {mockTurkishScenarios.map((scenario) => (
          <div key={scenario.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-semibold text-white text-lg flex-1">{scenario.scenario}</h4>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    scenario.probability >= 70 ? 'text-green-400' :
                    scenario.probability >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {scenario.probability}%
                  </div>
                  <div className="text-xs text-gray-400">Olasılık</div>
                </div>
                {audioEnabled && (
                  <button
                    onClick={() => playScenarioAudio(scenario)}
                    disabled={isLoading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-full transition-colors"
                    title="Senaryo analizini seslendir"
                  >
                    {isLoading && playingAudioId === scenario.id ? (
                      <Pause className="h-3 w-3 text-white" />
                    ) : (
                      <Play className="h-3 w-3 text-white" />
                    )}
                  </button>
                )}
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-gray-700 rounded">
              <h5 className="text-sm font-medium text-purple-400 mb-1">Hukuki Dayanak:</h5>
              <p className="text-sm text-gray-300">{scenario.legalBasis}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-blue-400 mb-2">Deliller:</h5>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                  {scenario.evidence.map((evidence, index) => (
                    <li key={index}>{evidence}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-green-400 mb-2">Sonuçlar:</h5>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                  {scenario.consequences.map((consequence, index) => (
                    <li key={index}>{consequence}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-700 rounded">
              <h5 className="text-sm font-medium text-yellow-400 mb-2">Uygulanabilir Yasalar:</h5>
              <div className="flex flex-wrap gap-2">
                {scenario.applicableLaws.map((law, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                    {law}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Türkçe Hukuki Metin TTS Sistemi</h2>
            <p className="text-gray-400">Türkçe hukuki dokümanlar ve analizler için gelişmiş ses sentezi</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {playingAudioId && (
              <button
                onClick={stopAudio}
                className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <StopCircle className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Sesi Durdur</span>
              </button>
            )}
            
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                audioEnabled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span className="text-sm">Ses {audioEnabled ? 'Açık' : 'Kapalı'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hata mesajı */}
      {audioError && (
        <div className="mb-6 bg-red-900 border border-red-700 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-red-200 text-sm">{audioError}</span>
          <button 
            onClick={() => setAudioError(null)}
            className="ml-auto text-red-400 hover:text-red-300"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bölüm navigasyonu */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors flex-1 min-w-fit ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* İçerik alanı */}
      <div className="min-h-96">
        {activeSection === 'dokuman' && renderDocumentsSection()}
        {activeSection === 'tanik' && renderWitnessSection()}
        {activeSection === 'zaman' && renderTimelineSection()}
        {activeSection === 'senaryo' && renderScenarioSection()}
      </div>

      {/* Audio durum göstergesi */}
      {isLoading && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <StopCircle className="h-4 w-4 animate-spin" />
            <span className="text-sm">Ses çalınıyor...</span>
          </div>
        </div>
      )}

      {/* Ses bilgisi */}
      {audioEnabled && availableVoices.length === 0 && (
        <div className="mt-4 bg-yellow-900 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-200 text-sm">
              Türkçe sesler yükleniyor. Lütfen bekleyin veya tarayıcıyı yenileyin.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurkishAudioComponent;