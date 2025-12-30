import React, { useRef } from 'react';
import { Download, Image } from 'lucide-react';
import { LegalCase } from '../types';

interface InfographicExportProps {
  caseData: LegalCase;
  onClose: () => void;
}

const InfographicExport: React.FC<InfographicExportProps> = ({ caseData, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateInfographic = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dikey boyut (mobil uyumlu)
    canvas.width = 800;
    canvas.height = 1400;

    // Arka plan gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Başlık alanı
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(0, 0, canvas.width, 200);

    // Logo/Başlık
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⚖️ YARGI AI', canvas.width / 2, 80);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px Arial';
    ctx.fillText('Hukuki Dava Analizi', canvas.width / 2, 120);

    // Tarih
    ctx.font = '16px Arial';
    ctx.fillText(new Date().toLocaleDateString('tr-TR'), canvas.width / 2, 160);

    // Dava Başlığı Kutusu
    ctx.fillStyle = '#1e3a5f';
    roundRect(ctx, 40, 220, canvas.width - 80, 120, 15);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    const title = caseData.title.length > 40 ? caseData.title.substring(0, 40) + '...' : caseData.title;
    ctx.fillText(title, 60, 270);
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px Arial';
    ctx.fillText(`${caseData.court} • ${caseData.year}`, 60, 310);

    // Benzerlik Dairesi
    const centerX = canvas.width - 120;
    const centerY = 280;
    const radius = 50;
    
    // Arka plan daire
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f3460';
    ctx.fill();
    
    // İlerleme dairesi
    const progress = caseData.similarity / 100;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * progress);
    ctx.strokeStyle = progress >= 0.7 ? '#22c55e' : progress >= 0.4 ? '#eab308' : '#ef4444';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${caseData.similarity}%`, centerX, centerY + 10);

    // Özet Bölümü
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('📋 ÖZET', 60, 400);
    
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px Arial';
    const summaryLines = wrapText(ctx, caseData.summary, canvas.width - 120, 16);
    summaryLines.forEach((line, i) => {
      ctx.fillText(line, 60, 440 + i * 25);
    });

    // Ana Faktörler
    const factorsY = 440 + summaryLines.length * 25 + 50;
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('🔑 ANA FAKTÖRLER', 60, factorsY);

    caseData.keyFactors.slice(0, 4).forEach((factor, i) => {
      ctx.fillStyle = '#3b82f6';
      roundRect(ctx, 60, factorsY + 20 + i * 45, canvas.width - 120, 35, 8);
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.fillText(`• ${factor}`, 80, factorsY + 45 + i * 45);
    });

    // Sonuç Bölümü
    const outcomeY = factorsY + 220;
    ctx.fillStyle = '#16a34a';
    roundRect(ctx, 40, outcomeY, canvas.width - 80, 100, 15);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('📌 SONUÇ', 60, outcomeY + 35);
    ctx.font = '16px Arial';
    ctx.fillText(caseData.outcome, 60, outcomeY + 70);

    // İstatistikler
    const statsY = outcomeY + 130;
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('📊 İSTATİSTİKLER', 60, statsY);

    // Stat boxes
    const stats = [
      { label: 'Uygunluk', value: `${caseData.relevance}%`, color: '#8b5cf6' },
      { label: 'Dava Türü', value: caseData.caseType, color: '#06b6d4' },
      { label: 'Kaynak', value: caseData.source.substring(0, 15), color: '#f59e0b' }
    ];

    stats.forEach((stat, i) => {
      const x = 60 + i * 240;
      ctx.fillStyle = stat.color;
      roundRect(ctx, x, statsY + 20, 220, 80, 10);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(stat.value, x + 110, statsY + 60);
      ctx.font = '14px Arial';
      ctx.fillText(stat.label, x + 110, statsY + 85);
    });

    // Footer
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Bu infografik Yargı AI tarafından oluşturulmuştur', canvas.width / 2, canvas.height - 45);
    ctx.fillText('thirdhandai.com.tr', canvas.width / 2, canvas.height - 25);

    // İndir
    const link = document.createElement('a');
    link.download = `yargi-ai-dava-${caseData.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onClose();
  };

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let line = '';

    words.forEach(word => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line = testLine;
      }
    });
    lines.push(line.trim());
    return lines.slice(0, 4); // Max 4 satır
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <Image className="h-5 w-5 text-purple-400" />
          <span>İnfografik Oluştur</span>
        </h3>
        
        <p className="text-gray-400 text-sm mb-6">
          "{caseData.title}" davası için dikey PNG infografik oluşturulacak.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={generateInfographic}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
          >
            <Download className="h-5 w-5" />
            <span>PNG İndir</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
          >
            İptal
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default InfographicExport;
