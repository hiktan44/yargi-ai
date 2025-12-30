import React, { useState } from 'react';
import { Book, Search, X } from 'lucide-react';

const legalTerms: Record<string, { definition: string; example?: string }> = {
  'emsal': { definition: 'Benzer davalarda verilen ve diğer davalar için örnek teşkil eden mahkeme kararları.', example: 'Yargıtay emsal kararı' },
  'içtihat': { definition: 'Mahkemelerin benzer davalarda verdikleri kararların bütünü, yerleşik uygulama.', example: 'Yargıtay içtihadı birleştirme kararı' },
  'temyiz': { definition: 'Bir mahkeme kararının üst mahkeme tarafından incelenmesi için yapılan başvuru.', example: 'Temyiz dilekçesi' },
  'istinaf': { definition: 'İlk derece mahkemesi kararlarının bölge adliye mahkemesince incelenmesi.', example: 'İstinaf kanun yolu' },
  'hüküm': { definition: 'Mahkemenin dava sonunda verdiği kesin karar.', example: 'Mahkumiyet hükmü' },
  'müdahil': { definition: 'Davaya taraf olmayıp, davanın sonucunda hukuki yararı olan kişi.', example: 'Davaya müdahil olarak katılmak' },
  'vekalet': { definition: 'Bir kişinin başka bir kişi adına hukuki işlem yapma yetkisi.', example: 'Avukat vekaleti' },
  'tebligat': { definition: 'Hukuki işlemlerin ilgililere resmi olarak bildirilmesi.', example: 'Tebligat kanunu' },
  'icra': { definition: 'Mahkeme kararlarının veya senetlerin zorla yerine getirilmesi.', example: 'İcra takibi' },
  'haciz': { definition: 'Borçlunun mallarına el konulması işlemi.', example: 'Haciz işlemi uygulamak' },
  'ihtiyati tedbir': { definition: 'Dava sonuçlanmadan önce hakların korunması için alınan geçici önlem.', example: 'İhtiyati tedbir kararı' },
  'zamanaşımı': { definition: 'Bir hakkın kullanılması için kanunun öngördüğü süre.', example: 'Zamanaşımı süresi dolmuş' },
  'kusur': { definition: 'Hukuka aykırı davranışta bulunan kişinin sorumluluğu.', example: 'Ağır kusur' },
  'tazminat': { definition: 'Hukuka aykırı fiil nedeniyle uğranılan zararın karşılanması.', example: 'Maddi ve manevi tazminat' },
  'kesinleşme': { definition: 'Mahkeme kararının artık değiştirilemez hale gelmesi.', example: 'Karar kesinleşti' },
  'bilirkişi': { definition: 'Teknik konularda görüş bildiren uzman kişi.', example: 'Bilirkişi raporu' },
  'yetki': { definition: 'Bir mahkemenin davaya bakma hakkı.', example: 'Yetkili mahkeme' },
  'görev': { definition: 'Davanın hangi tür mahkemede görüleceğini belirleyen kural.', example: 'Görevli mahkeme' },
  'husumet': { definition: 'Davada taraf olma sıfatı.', example: 'Husumet itirazı' },
  'derdest': { definition: 'Görülmekte olan, henüz sonuçlanmamış dava.', example: 'Derdest dava' }
};

interface LegalDictionaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalDictionary: React.FC<LegalDictionaryProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;

  const filteredTerms = Object.entries(legalTerms).filter(([term]) =>
    term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">Hukuki Terim Sözlüğü</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Terim ara..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm"
            />
          </div>
        </div>

        <div className="overflow-auto max-h-[60vh] p-4 space-y-3">
          {filteredTerms.map(([term, info]) => (
            <div key={term} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors">
              <h3 className="text-yellow-400 font-semibold capitalize mb-1">{term}</h3>
              <p className="text-gray-300 text-sm">{info.definition}</p>
              {info.example && (
                <p className="text-gray-500 text-xs mt-2 italic">Örnek: {info.example}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalDictionary;
