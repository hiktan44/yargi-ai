import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CasePrediction: React.FC = () => {
  const [caseDetails, setCaseDetails] = useState('');
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const predictCase = async () => {
    if (!caseDetails.trim()) return;
    setIsLoading(true);
    
    try {
      const { data } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: `Sen bir hukuk analisti olarak dava sonuçlarını tahmin ediyorsun. Verilen dava bilgilerine göre JSON formatında yanıt ver:
              {
                "kazanma_olasiligi": 75,
                "guclu_yonler": ["Güçlü delil", "Emsal karar desteği"],
                "zayif_yonler": ["Tanık eksikliği"],
                "tahmini_sure": "6-12 ay",
                "tavsiye": "Kısa tavsiye"
              }`
            },
            { role: 'user', content: caseDetails }
          ]
        }
      });
      
      const jsonMatch = data.response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setPrediction(JSON.parse(jsonMatch[0]));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
        <TrendingUp className="h-5 w-5 text-green-400" />
        <span>Dava Kazanma Tahmini</span>
      </h3>

      <textarea
        value={caseDetails}
        onChange={(e) => setCaseDetails(e.target.value)}
        placeholder="Dava detaylarını girin: taraflar, olay özeti, deliller..."
        className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 text-sm resize-none"
      />

      <button
        onClick={predictCase}
        disabled={!caseDetails.trim() || isLoading}
        className="mt-3 w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-white flex items-center justify-center space-x-2"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
        <span>{isLoading ? 'Analiz Ediliyor...' : 'Tahmin Et'}</span>
      </button>

      {prediction && (
        <div className="mt-6 space-y-4">
          {/* Ana Tahmin */}
          <div className={`p-6 rounded-lg text-center ${
            prediction.kazanma_olasiligi >= 70 ? 'bg-green-900/40 border border-green-600' :
            prediction.kazanma_olasiligi >= 40 ? 'bg-yellow-900/40 border border-yellow-600' :
            'bg-red-900/40 border border-red-600'
          }`}>
            <div className="text-5xl font-bold mb-2" style={{
              color: prediction.kazanma_olasiligi >= 70 ? '#4ade80' :
                     prediction.kazanma_olasiligi >= 40 ? '#facc15' : '#f87171'
            }}>
              %{prediction.kazanma_olasiligi}
            </div>
            <div className="text-gray-300">Kazanma Olasılığı</div>
          </div>

          {/* Güçlü/Zayıf Yönler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-900/20 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2 flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>Güçlü Yönler</span>
              </h4>
              <ul className="space-y-1">
                {prediction.guclu_yonler?.map((g: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300">• {g}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-red-900/20 rounded-lg">
              <h4 className="text-red-400 font-medium mb-2 flex items-center space-x-1">
                <XCircle className="h-4 w-4" />
                <span>Zayıf Yönler</span>
              </h4>
              <ul className="space-y-1">
                {prediction.zayif_yonler?.map((z: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300">• {z}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Süre ve Tavsiye */}
          <div className="p-4 bg-gray-700/50 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong>Tahmini Süre:</strong> {prediction.tahmini_sure}
            </p>
            <p className="text-gray-300 text-sm mt-2">
              <strong>Tavsiye:</strong> {prediction.tavsiye}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasePrediction;
