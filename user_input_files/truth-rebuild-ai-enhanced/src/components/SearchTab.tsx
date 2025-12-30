import React, { useState, useEffect } from 'react';
import { Search, Filter, Volume2, VolumeX, Play, Loader2, FileDown, GitCompare, Menu, Image } from 'lucide-react';
import { mockLegalCases, searchExamples, verifiedLegalSources } from '../data/legalCases';
import { audioService } from '../services/audioService';
import { LegalCase } from '../types';
import { searchLegalCases, type LegalSearchResult } from '../lib/supabase';
import { generatePDF } from '../services/pdfService';
import CompareModal from './CompareModal';
import SavedSearches, { SavedSearch } from './SavedSearches';
import InfographicExport from './InfographicExport';

// Kurumlar listesi - TÜM KURUMLAR AKTİF
const INSTITUTIONS = [
  { code: 'yargitay', name: 'Yargıtay', active: true },
  { code: 'danistay', name: 'Danıştay', active: true },
  { code: 'anayasa', name: 'Anayasa Mahkemesi', active: true },
  { code: 'sayistay', name: 'Sayıştay', active: true },
  { code: 'kik', name: 'Kamu İhale Kurulu', active: true },
  { code: 'uyusmazlik', name: 'Uyuşmazlık Mahkemesi', active: true },
  { code: 'bddk', name: 'BDDK', active: true },
  { code: 'kvkk', name: 'KVKK', active: true },
  { code: 'rekabet', name: 'Rekabet Kurumu', active: true },
  { code: 'emsal', name: 'Emsal (UYAP)', active: true },
  { code: 'bedesten', name: 'Bedesten', active: true }
];

const SearchTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LegalCase[]>(mockLegalCases);
  const [isSearching, setIsSearching] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [useRealAPI, setUseRealAPI] = useState(true);
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>(
    INSTITUTIONS.filter(inst => inst.active).map(inst => inst.code)
  );
  const [showInstitutionSelector, setShowInstitutionSelector] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [compareCases, setCompareCases] = useState<LegalCase[]>([]);
  const [infographicCase, setInfographicCase] = useState<LegalCase | null>(null);

  useEffect(() => {
    // Filter results based on search query
    if (searchQuery.trim()) {
      const filtered = mockLegalCases.filter(case_ =>
        case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.keyFactors.some(factor => 
          factor.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        case_.caseType.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(mockLegalCases);
    }
  }, [searchQuery]);

  const handleInstitutionToggle = (code: string) => {
    setSelectedInstitutions(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  const toggleAllInstitutions = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedInstitutions(INSTITUTIONS.map(inst => inst.code));
    } else {
      setSelectedInstitutions([]);
    }
  };

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;
    
    if (useRealAPI && selectedInstitutions.length === 0) {
      setSearchError('Lütfen en az bir kurum seçin');
      return;
    }
    
    setIsSearching(true);
    setSearchError(null);
    
    try {
      if (useRealAPI) {
        // Gerçek API'den arama yap - sadece seçilen kurumlardan
        const response = await searchLegalCases({
          searchQuery: searchTerm,
          institutions: selectedInstitutions,
          filters: {
            page: 1,
            pageSize: 20
          }
        });

        // API sonuçlarını LegalCase formatına dönüştür
        const convertedResults: LegalCase[] = [];
        
        response.results.forEach((institutionResult) => {
          institutionResult.results.forEach((result: LegalSearchResult) => {
            convertedResults.push({
              id: result.id,
              title: result.title,
              court: result.court,
              year: result.year || 'Bilinmiyor',
              summary: result.summary || 'Özet bulunamadı',
              keyFactors: [result.caseType],
              caseType: result.caseType,
              outcome: 'Detay için tıklayın',
              relevance: result.relevance,
              similarity: result.relevance,
              source: result.source,
              url: result.url
            });
          });
        });

        if (convertedResults.length > 0) {
          setSearchResults(convertedResults);
        } else {
          setSearchResults([]);
          setSearchError('Arama sonucu bulunamadı. Farklı arama terimleri deneyin.');
        }
      } else {
        // Mock data ile çalış
        const filtered = mockLegalCases.filter(case_ =>
          case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          case_.keyFactors.some(factor => 
            factor.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          case_.caseType.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
      }
    } catch (error: any) {
      console.error('Arama hatası:', error);
      setSearchError(error.message || 'Arama sırasında bir hata oluştu');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setSearchQuery(example);
    handleSearch(example);
  };

  const playAudioSummary = async (case_: LegalCase) => {
    if (!audioEnabled) return;
    
    try {
      setPlayingAudioId(case_.id);
      
      await audioService.playAudio({
        id: case_.id,
        title: `Dava Özeti: ${case_.title}`,
        voiceType: 'default',
        text: `${case_.title}. ${case_.summary} Ana faktörler şunlardır: ${case_.keyFactors.join(', ')}. Sonuç: ${case_.outcome}`,
        category: 'case-summary'
      });
    } catch (error) {
      console.error('Audio playback failed:', error);
    } finally {
      setPlayingAudioId(null);
    }
  };

  const stopAudio = () => {
    audioService.stopAudio();
    setPlayingAudioId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">İçtihat Araması</h2>
        <p className="text-gray-400">
          Doğrulanmış kamuya açık hukuki veritabanlarında yapay zekâ destekli arama
        </p>
      </div>

      {/* Audio Control */}
      <div className="mb-6 flex justify-end">
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

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Dava içtihatları, emsal kararlar veya anahtar terimler arayın..."
            className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSearching}
          />
          <button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-1.5 rounded text-white text-sm font-medium transition-colors flex items-center space-x-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Aranıyor...</span>
              </>
            ) : (
              <span>Ara</span>
            )}
          </button>
        </div>
        
        {/* API Toggle, Institution Selector and Saved Searches */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useRealAPI}
                onChange={(e) => setUseRealAPI(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-400">Gerçek API</span>
            </label>
            
            <button
              onClick={() => setShowInstitutionSelector(!showInstitutionSelector)}
              className="text-sm text-blue-400 hover:text-blue-300 underline"
            >
              Kurum ({selectedInstitutions.length}/11)
            </button>
          </div>
          
          <SavedSearches
            currentQuery={searchQuery}
            currentInstitutions={selectedInstitutions}
            onSelect={(search: SavedSearch) => {
              setSearchQuery(search.query);
              setSelectedInstitutions(search.institutions);
            }}
          />
        </div>
        
        {/* Institution Selector */}
        {showInstitutionSelector && (
          <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Kurumları Seç</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleAllInstitutions(true)}
                  className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Tümünü Seç
                </button>
                <button
                  onClick={() => toggleAllInstitutions(false)}
                  className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded"
                >
                  Hiçbirini Seçme
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {INSTITUTIONS.map((institution) => (
                <label
                  key={institution.code}
                  className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                    selectedInstitutions.includes(institution.code)
                      ? 'bg-blue-900/40 border border-blue-700'
                      : 'bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedInstitutions.includes(institution.code)}
                    onChange={() => handleInstitutionToggle(institution.code)}
                    className="mr-2"
                  />
                  <div className="flex-1">
                    <span className={`text-sm ${
                      selectedInstitutions.includes(institution.code)
                        ? 'text-white font-medium'
                        : 'text-gray-300'
                    }`}>
                      {institution.name}
                    </span>
                    {institution.active && (
                      <span className="ml-2 text-xs text-green-400 bg-green-900/30 px-1.5 py-0.5 rounded">
                        Aktif
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
            
            <div className="mt-3 p-2 bg-blue-900/20 border border-blue-700/30 rounded text-xs text-blue-300">
              <strong>Seçilen Kurumlar:</strong> {selectedInstitutions.length > 0 
                ? INSTITUTIONS.filter(inst => selectedInstitutions.includes(inst.code)).map(inst => inst.name).join(', ')
                : 'Hiçbiri'}
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {searchError && (
          <div className="mt-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
            <p className="text-red-400 text-sm">{searchError}</p>
          </div>
        )}
      </div>

      {/* Quick Search Examples */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-3">Hızlı Arama Örnekleri</h3>
        <div className="flex flex-wrap gap-2">
          {searchExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg text-sm transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Data Sources Disclaimer */}
      <div className="mb-8 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Doğrulanmış Hukuki Kaynaklar</h3>
        <p className="text-gray-300 text-sm mb-3">
          Tüm hukuki veriler doğrulanmış kamuya açık veritabanlarından sağlanır:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {verifiedLegalSources.map((source) => (
            <div key={source.id} className="bg-gray-800/50 p-3 rounded">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-blue-300 text-sm">{source.name}</h4>
                <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                  {source.status}
                </span>
              </div>
              <p className="text-xs text-gray-400">{source.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Sonuçlar ({searchResults.length})
          </h3>
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setShowCompare(true)}
              disabled={searchResults.length < 2}
              className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white text-sm transition-colors"
            >
              <GitCompare className="h-4 w-4" />
              <span className="hidden sm:inline">Karşılaştır</span>
              {compareCases.length > 0 && (
                <span className="bg-purple-400 text-purple-900 px-1.5 py-0.5 rounded-full text-xs font-bold">
                  {compareCases.length}
                </span>
              )}
            </button>
            <button
              onClick={() => generatePDF(searchResults, searchQuery)}
              disabled={searchResults.length === 0}
              className="flex items-center space-x-1 sm:space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white text-sm transition-colors"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {searchResults.map((case_) => (
            <div key={case_.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-1">{case_.title}</h4>
                  <p className="text-sm text-gray-400">{case_.court} • {case_.year}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      if (compareCases.find(c => c.id === case_.id)) {
                        setCompareCases(prev => prev.filter(c => c.id !== case_.id));
                      } else if (compareCases.length < 2) {
                        setCompareCases(prev => [...prev, case_]);
                      }
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      compareCases.find(c => c.id === case_.id)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                    title={compareCases.find(c => c.id === case_.id) ? 'Karşılaştırmadan çıkar' : 'Karşılaştırmaya ekle'}
                  >
                    <GitCompare className="h-4 w-4" />
                  </button>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-400">{case_.similarity}%</div>
                    <div className="text-xs text-gray-400">Benzerlik</div>
                  </div>
                  {audioEnabled && (
                    <button
                      onClick={() => playingAudioId === case_.id ? stopAudio() : playAudioSummary(case_)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                      title={playingAudioId === case_.id ? 'Sesi durdur' : 'Sesli özeti çal'}
                    >
                      {playingAudioId === case_.id ? (
                        <VolumeX className="h-4 w-4 text-white" />
                      ) : (
                        <Play className="h-4 w-4 text-white" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{case_.summary}</p>
              
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-300 mb-2">Ana Faktörler:</h5>
                <div className="flex flex-wrap gap-1">
                  {case_.keyFactors.map((factor, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  <strong>Sonuç:</strong> {case_.outcome}
                </div>
                <div className="text-gray-500">
                  Uygunluk: {case_.relevance}%
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">
                    <strong>Kaynak:</strong> {case_.source}
                  </div>
                  {case_.url && (
                    <a
                      href={case_.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 underline mt-1 inline-block"
                    >
                      Karar detayını görüntüle
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setInfographicCase(case_)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-white text-xs transition-colors"
                  title="İnfografik olarak indir"
                >
                  <Image className="h-3 w-3" />
                  <span>PNG</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results */}
      {searchResults.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Sonuç bulunamadı</h3>
            <p className="text-sm">Farklı arama terimleri deneyin veya örneklerimize göz atın</p>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <CompareModal
          cases={searchResults}
          selectedCases={compareCases}
          onClose={() => setShowCompare(false)}
          onSelect={(case_) => setCompareCases(prev => [...prev, case_])}
          onRemove={(id) => setCompareCases(prev => prev.filter(c => c.id !== id))}
        />
      )}

      {/* Infographic Export Modal */}
      {infographicCase && (
        <InfographicExport
          caseData={infographicCase}
          onClose={() => setInfographicCase(null)}
        />
      )}
    </div>
  );
};

export default SearchTab;
