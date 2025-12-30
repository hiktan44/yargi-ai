// PDF Export Service - Browser Print API kullanarak
import { LegalCase } from '../types';

export const generatePDF = (cases: LegalCase[], searchQuery: string) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Pop-up engelleyici aktif olabilir. Lütfen izin verin.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <title>Yargı AI - Arama Sonuçları</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px;
          color: #333;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #1e40af;
        }
        .header h1 { color: #1e40af; font-size: 28px; margin-bottom: 5px; }
        .header p { color: #666; font-size: 14px; }
        .search-info {
          background: #f0f9ff;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 25px;
        }
        .search-info strong { color: #1e40af; }
        .case-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .case-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .case-title { 
          font-size: 16px; 
          font-weight: 600; 
          color: #1f2937;
          margin-bottom: 5px;
        }
        .case-court { font-size: 13px; color: #6b7280; }
        .similarity {
          background: #fef3c7;
          color: #92400e;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
        }
        .summary { 
          color: #4b5563; 
          margin-bottom: 15px;
          font-size: 14px;
        }
        .factors-label { 
          font-size: 13px; 
          font-weight: 600; 
          color: #374151;
          margin-bottom: 8px;
        }
        .factors {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 15px;
        }
        .factor {
          background: #e5e7eb;
          color: #374151;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
        }
        .outcome {
          font-size: 13px;
          color: #374151;
          padding-top: 10px;
          border-top: 1px solid #e5e7eb;
        }
        .outcome strong { color: #1e40af; }
        .source {
          font-size: 11px;
          color: #9ca3af;
          margin-top: 10px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        }
        @media print {
          body { padding: 20px; }
          .case-card { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⚖️ Yargı AI</h1>
        <p>Yapay Zekâ Destekli Hukuk Asistanı - Arama Sonuçları</p>
      </div>

      <div class="search-info">
        <strong>Arama Sorgusu:</strong> "${searchQuery || 'Tüm sonuçlar'}"<br>
        <strong>Toplam Sonuç:</strong> ${cases.length} karar<br>
        <strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>

      ${cases.map(c => `
        <div class="case-card">
          <div class="case-header">
            <div>
              <div class="case-title">${c.title}</div>
              <div class="case-court">${c.court} • ${c.year}</div>
            </div>
            <div class="similarity">${c.similarity}% Benzerlik</div>
          </div>
          
          <div class="summary">${c.summary}</div>
          
          <div class="factors-label">Ana Faktörler:</div>
          <div class="factors">
            ${c.keyFactors.map(f => `<span class="factor">${f}</span>`).join('')}
          </div>
          
          <div class="outcome">
            <strong>Sonuç:</strong> ${c.outcome} | <strong>Uygunluk:</strong> ${c.relevance}%
          </div>
          
          <div class="source">Kaynak: ${c.source}</div>
        </div>
      `).join('')}

      <div class="footer">
        Bu rapor Yargı AI tarafından oluşturulmuştur.<br>
        ThirdhandAI © ${new Date().getFullYear()} - Yalnızca bilgi amaçlıdır, hukuki tavsiye niteliği taşımaz.
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
