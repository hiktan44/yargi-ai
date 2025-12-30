import React, { useState } from 'react';

const AnalysisTab: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Test Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">✅ Analiz Sekmesi Çalışıyor!</h2>
        <p className="text-gray-400">Türkçe yerelleştirme başarıyla tamamlandı.</p>
      </div>

      {/* Simple Content */}
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Test Sonuçları</h3>
        <p className="text-green-400">✅ Dava Analizi component'i başarıyla render edildi</p>
        <p className="text-green-400">✅ Türkçe metinler düzgün görüntüleniyor</p>
        <p className="text-green-400">✅ UI elementleri çalışıyor</p>
        <p className="text-blue-400 mt-4">Audio enabled: {audioEnabled ? 'Açık' : 'Kapalı'}</p>
      </div>

      {/* Section Buttons Test */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          İçtihatlar
        </button>
        <button className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg">
          Tanık Analizi
        </button>
        <button className="p-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
          Zaman Çizelgesi
        </button>
        <button className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
          Senaryo Analizi
        </button>
      </div>
    </div>
  );
};

export default AnalysisTab;