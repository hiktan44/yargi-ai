# Truth Re:Build AI - Kurum Seçim Sistemi Test Planı

## Test Plan
**Website Type**: SPA
**Deployed URL**: https://3mo5st77abp4.space.minimax.io
**Test Date**: 2025-11-05
**Yeni Özellikler**: 
- SearchTab multi-select kurum seçim sistemi
- AnalysisTab kurum filtreleme sistemi

### Pathways to Test
- [ ] SearchTab kurum seçim UI açılıyor mu
- [ ] Kurum seçme/seçimi kaldırma çalışıyor mu
- [ ] Seçilen kurumlarla arama yapılıyor mu
- [ ] AnalysisTab kurum filtreleme UI açılıyor mu
- [ ] Analiz verilerinde kurum filtreleme çalışıyor mu

## Testing Progress

### Step 1: Pre-Test Planning
- Website complexity: Simple (SPA with 2 main tabs)
- Test strategy: Yeni eklenen kurum seçim sistemini odaklı test

### Step 2: Comprehensive Testing
**Status**: Manuel Test Gerekiyor (Otomatik test servisi kullanılamıyor)

**Deployment Başarılı**: https://3mo5st77abp4.space.minimax.io

**Eklenen Özellikler**:
1. SearchTab - Kurum Seçim Sistemi:
   - "Kurum Seç (X/11)" butonu eklendi
   - 11 kurumu görebilir checkbox listesi
   - "Tümünü Seç" / "Hiçbirini Seçme" butonları
   - Aktif kurumlar (Yargıtay, Danıştay, Anayasa Mahkemesi) yeşil etiketli
   - Yakında gelecek kurumlar (8 tane) sarı etiketli
   - Seçilen kurumlar dinamik olarak gösteriliyor
   - Backend'e sadece seçilen kurumlar gönderiliyor

2. AnalysisTab - Kurum Filtreleme:
   - "Kurumlar (X/11)" filtreleme butonu eklendi (sağ üst)
   - Aynı kurum seçim paneli
   - "Verileri Yenile" butonu ile seçilen kurumlardan yeni veri yükleme
   - Tüm 4 analiz bölümü (İçtihat, Tanık, Zaman Çizelgesi, Senaryo) seçilen kurumlara göre çalışıyor

**Manuel Test Adımları**:
1. https://3mo5st77abp4.space.minimax.io adresini aç
2. SearchTab'de "Kurum Seç" butonuna tıkla
3. İstediğin kurumları seç (örn: sadece Danıştay ve Anayasa Mahkemesi)
4. Arama yap ve sonuçların sadece seçilen kurumlardan geldiğini doğrula
5. AnalysisTab'e geç
6. "Kurumlar" filtreleme butonuna tıkla
7. Kurumları seç ve "Verileri Yükle" butonuna tıkla
8. İçtihat analizinde seçilen kurumların görüntülendiğini kontrol et

**Teknik Detaylar**:
- Frontend: React + TypeScript
- Backend: Supabase Edge Function (https://jnnwhnjmgnmvhgogifzd.supabase.co/functions/v1/legal-search)
- Kurum seçimi: State management ile localStorage'a kaydedilebilir (opsiyonel iyileştirme)
- API backward compatibility: Tüm kurumları varsayılan olarak destekliyor
