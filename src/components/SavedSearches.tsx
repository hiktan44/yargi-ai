import React, { useState, useEffect } from 'react';
import { Bookmark, X, Clock, Trash2 } from 'lucide-react';

export interface SavedSearch {
  id: string;
  query: string;
  institutions: string[];
  date: string;
}

interface SavedSearchesProps {
  onSelect: (search: SavedSearch) => void;
  currentQuery: string;
  currentInstitutions: string[];
}

export const SavedSearches: React.FC<SavedSearchesProps> = ({
  onSelect,
  currentQuery,
  currentInstitutions,
}) => {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('yargi-saved-searches');
    if (saved) setSearches(JSON.parse(saved));
  }, []);

  const saveSearch = () => {
    if (!currentQuery.trim()) return;
    
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query: currentQuery,
      institutions: currentInstitutions,
      date: new Date().toLocaleDateString('tr-TR'),
    };
    
    const updated = [newSearch, ...searches].slice(0, 10);
    setSearches(updated);
    localStorage.setItem('yargi-saved-searches', JSON.stringify(updated));
  };

  const deleteSearch = (id: string) => {
    const updated = searches.filter(s => s.id !== id);
    setSearches(updated);
    localStorage.setItem('yargi-saved-searches', JSON.stringify(updated));
  };

  const clearAll = () => {
    setSearches([]);
    localStorage.removeItem('yargi-saved-searches');
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={saveSearch}
          disabled={!currentQuery.trim()}
          className="flex items-center space-x-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white text-sm transition-colors"
          title="Aramayı kaydet"
        >
          <Bookmark className="h-4 w-4" />
          <span className="hidden sm:inline">Kaydet</span>
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
        >
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">Kayıtlı</span>
          {searches.length > 0 && (
            <span className="bg-yellow-500 text-yellow-900 px-1.5 py-0.5 rounded-full text-xs font-bold">
              {searches.length}
            </span>
          )}
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-72 sm:w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <h4 className="text-sm font-medium text-white">Kayıtlı Aramalar</h4>
            <div className="flex items-center space-x-2">
              {searches.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Tümünü Sil
                </button>
              )}
              <button onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {searches.length === 0 ? (
              <div className="p-4 text-center text-gray-400 text-sm">
                Henüz kayıtlı arama yok
              </div>
            ) : (
              searches.map(search => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-700/50 border-b border-gray-700/50 last:border-0"
                >
                  <button
                    onClick={() => {
                      onSelect(search);
                      setIsOpen(false);
                    }}
                    className="flex-1 text-left"
                  >
                    <div className="text-sm text-white truncate">{search.query}</div>
                    <div className="text-xs text-gray-400">
                      {search.institutions.length} kurum • {search.date}
                    </div>
                  </button>
                  <button
                    onClick={() => deleteSearch(search.id)}
                    className="p-1 hover:bg-gray-600 rounded ml-2"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;
