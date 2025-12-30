import React from 'react';

const UploadTab: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Delil Görüntü Tanıma</h2>
        <p className="text-gray-400">Coğrafi konum analizi ve adli görüntü incelemesi (GeoSpy benzeri)</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <h4 className="font-medium text-gray-400 mb-2">Yükleme Özelliği Yakında</h4>
        <p className="text-gray-500 text-sm">
          Geliştirilmiş görüntü analizi ve sesli anlatım bir sonraki güncellemede sunulacaktır
        </p>
      </div>
    </div>
  );
};

export default UploadTab;
