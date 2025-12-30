import React from 'react';
import { Scale, Shield, Database } from 'lucide-react';
import { verifiedLegalSources } from '../data/legalCases';

const AboutTab: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Scale className="h-12 w-12 text-yellow-400" />
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Yargı AI</h2>
            <p className="text-xl text-gray-400">Yapay Zekâ Destekli Hukuk Asistanı Platformu</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-6">Misyonumuz</h3>
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Yargı AI, son teknoloji yapay zekayı kapsamlı hukuk veritabanlarıyla birleştirerek hukuki araştırma ve dava analizini devrimleştirir. Platformumuz, hukuk profesyonelleri ve vatandaşların eşsiz kesinlik ve verimlilikle gerçeği ortaya çıkarmalarını sağlar.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Gerçeği Yeniden İnşa Etmek</h4>
              <p className="text-gray-400 text-sm">Zaman çizelgelerini kesinlikle yeniden yapılandırın</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Tutarsızlıkları Tespit Etmek</h4>
              <p className="text-gray-400 text-sm">Hukuki bilgilerdeki çelişkileri belirleyin</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Stratejik İçgörüler</h4>
              <p className="text-gray-400 text-sm">İleri seviye AI analizi sağlayın</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-6">Geliştirilmiş Özellikler</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Ses İşlevselliği</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-blue-400">Tarayıcı Metinden Sese (Text-to-Speech):</strong> Rol-özel ses özelleştirmeli akıllı yedek sistem
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-blue-400">Duruşma Ses Betikleri:</strong> Profesyonel anlatımlı entegre örnek duruşma süreçleri
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Temel Yetenekler</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-yellow-400">İçtihat Arama:</strong> Uygunluk puanlamalı yapay zekâ destekli dava veritabanı
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-yellow-400">Söylevsel Yapay Zekâ Asistanı:</strong> Doğal dil dava analizi ve hukuki danışmanlık
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-6">Doğrulanmış Hukuki Kaynaklar</h3>
        <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 mb-6">
          <p className="text-green-300 mb-4">
            Tüm hukuki veriler yalnızca doğrulanmış kamuya açık veritabanlarından sağlanır; bu durum hukuki uyumluluğu ve eğitim güvenliğini sağlar.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {verifiedLegalSources.map((source) => (
              <div key={source.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white text-sm">{source.name}</h4>
                  <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                    {source.status}
                  </span>
                </div>
                <p className="text-gray-300 text-xs mb-2">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-6">Önemli Hukuki Sorumsuzluk Uyarıları</h3>
        <div className="space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Yalnızca Eğitim Amaçlı Kullanım</h4>
            <p className="text-gray-300 text-sm">
              Bu platform yalnızca eğitim ve demo amaçlı olarak tasarlanmıştır. 
              Tüm dava verileri anonimleştirilmiştir ve gerçek hukuki işlemlerde kullanılmamalıdır.
            </p>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-400 mb-2">Hukuki Tavsiye Değildir</h4>
            <p className="text-gray-300 text-sm">
              Bu platform tarafından sağlanan bilgiler hukuki tavsiye teşkil etmez. 
              Gerçek hukuki işler için kullanıcıların nitelikli hukuk profesyonelleriyle görüşmeleri gerekmektedir.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-8 border-t border-gray-700">
        <p className="text-gray-400 mb-2">
          Geliştiren: <a href="https://thirdhandai.com.tr" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">ThirdhandAI tarafından yapılmıştır</a>
        </p>
        <p className="text-sm text-gray-500">
          Geliştirilmiş Ses ve Doğrulanmış Hukuki Kaynaklar • Eğitim Demoları • Ağustos 2025
        </p>
      </div>
    </div>
  );
};

export default AboutTab;
