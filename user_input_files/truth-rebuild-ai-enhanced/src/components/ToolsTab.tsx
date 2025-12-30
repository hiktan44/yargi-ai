import React, { useState } from 'react';
import { Wrench, Book } from 'lucide-react';
import CasePrediction from './CasePrediction';
import PetitionGenerator from './PetitionGenerator';
import LegalDictionary from './LegalDictionary';

const ToolsTab: React.FC = () => {
  const [showDictionary, setShowDictionary] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center space-x-2">
            <Wrench className="h-7 w-7 text-orange-400" />
            <span>Hukuk Araçları</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">Yapay zeka destekli hukuki yardımcı araçlar</p>
        </div>
        <button
          onClick={() => setShowDictionary(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white transition-colors"
        >
          <Book className="h-5 w-5" />
          <span className="hidden sm:inline">Sözlük</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dava Kazanma Tahmini */}
        <CasePrediction />
        
        {/* Dilekçe Oluşturucu */}
        <PetitionGenerator />
      </div>

      {/* Hukuki Terim Sözlüğü Modal */}
      <LegalDictionary isOpen={showDictionary} onClose={() => setShowDictionary(false)} />
    </div>
  );
};

export default ToolsTab;
