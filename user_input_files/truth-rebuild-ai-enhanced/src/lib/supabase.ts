import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "http://supabasekong-lwcg4k08sskkw8g84swcc008.65.108.77.26.sslip.io";
const supabaseAnonKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NjkyMTQwMCwiZXhwIjo0OTIyNTk1MDAwLCJyb2xlIjoiYW5vbiJ9.ReVoOBusbwZBN2RP6EVekx5vfUXZoRYs0Z0viI5ojsk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// OpenAI API key for direct calls
const OPENAI_API_KEY = "sk_1cab66888c57ffdf16c7263f0d8b101636cac13986635858";

// Python Backend URL (Coolify)
const PYTHON_BACKEND_URL = "http://tcgkgkkocs400ogs8ok8swcw.65.108.77.26.sslip.io";

export interface LegalSearchParams {
  searchQuery: string;
  institutions?: string[];
  filters?: {
    page?: number;
    pageSize?: number;
    daire?: string;
    esasYil?: string;
    kararYil?: string;
  };
}

export interface LegalSearchResult {
  id: string;
  title: string;
  court: string;
  year?: string;
  summary: string;
  caseType: string;
  source: string;
  url: string;
  relevance: number;
  date?: string;
}

export interface InstitutionResult {
  institution: string;
  name: string;
  count: number;
  totalRecords: number;
  results: LegalSearchResult[];
  message?: string;
}

export interface LegalSearchResponse {
  results: InstitutionResult[];
  errors: any[] | null;
  totalInstitutions: number;
  successCount: number;
  errorCount: number;
}

// Demo data fallback
const generateDemoResults = (query: string): LegalSearchResponse => {
  const demoResults: LegalSearchResult[] = [
    {
      id: '1',
      title: `${query} - Yargıtay Örnek Kararı (Demo)`,
      court: 'Yargıtay 9. Hukuk Dairesi',
      year: '2024',
      summary: `${query} konusunda emsal niteliğinde karar (API bağlantısı sağlanamadığı için demo veri gösteriliyor).`,
      caseType: 'İş Hukuku',
      source: 'Yargıtay',
      url: 'https://karararama.yargitay.gov.tr',
      relevance: 95,
      date: '2024-03-15'
    }
  ];

  return {
    results: [
      {
        institution: 'yargitay',
        name: 'Yargıtay',
        count: 1,
        totalRecords: 1,
        results: demoResults
      }
    ],
    errors: null,
    totalInstitutions: 1,
    successCount: 1,
    errorCount: 0
  };
};

export async function searchLegalCases(params: LegalSearchParams): Promise<LegalSearchResponse> {
  // 1. PYTHON BACKEND API ÇAĞRISI (DIRECT)
  try {
    console.log("Searching via Python Backend:", PYTHON_BACKEND_URL);
    const response = await fetch(`${PYTHON_BACKEND_URL}/functions/v1/legal-search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: params.searchQuery
      })
    });

    if (!response.ok) {
      throw new Error(`Python API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Python Backend Response:", data);

    const items = data.results || [];

    // Convert to InstitutionResult format
    if (items.length > 0) {
      // Sonuçları 'source' e göre grupla
      const grouped: Record<string, LegalSearchResult[]> = {};

      items.forEach((item: any) => {
        const sourceKey = (item.source || 'yargitay').toLowerCase();
        if (!grouped[sourceKey]) grouped[sourceKey] = [];

        grouped[sourceKey].push({
          id: item.id || Math.random().toString(),
          title: item.title,
          court: item.metadata?.daire || item.source,
          year: '2024', // API'den yıl gelmiyorsa
          summary: item.content || item.summary,
          caseType: 'Genel',
          source: item.source || 'Bilinmiyor',
          url: item.url || '#',
          relevance: 100,
          date: item.metadata?.tarih
        });
      });

      const results: InstitutionResult[] = Object.keys(grouped).map(key => ({
        institution: key,
        name: key.toUpperCase(),
        count: grouped[key].length,
        totalRecords: grouped[key].length,
        results: grouped[key]
      }));

      return {
        results,
        errors: null,
        totalInstitutions: results.length,
        successCount: results.length,
        errorCount: 0
      };
    } else {
      // backend boş döndü
      console.warn("Backend returned empty results.");
      // fallback to demo? No, return empty to show "No results found" correctly.
      return {
        results: [],
        errors: null,
        totalInstitutions: 0,
        successCount: 0,
        errorCount: 0
      };
    }

  } catch (error) {
    console.error("Python Backend Failed:", error);

    // 2. SUPABASE EDGE FUNCTION (FALLBACK)
    try {
      console.log("Attempting Supabase Edge Function invoke...");
      const { data, error } = await supabase.functions.invoke('legal-search', {
        body: { query: params.searchQuery }
      });

      if (error) throw error;

      // Supabase dönüş formatını işle... (eğer çalışırsa)
      // Ama şimdilik demo veriye düşürelim hata olursa.
    } catch (sbError) {
      console.error("Supabase Edge Function Failed:", sbError);
    }

    // 3. DEMO VERİ (SON ÇARE)
    console.warn("All APIs failed, showing demo data.");
    return generateDemoResults(params.searchQuery);
  }
}

// Chat function (Direct OpenAI - No changes needed)
export async function chatWithAI(messages: { role: string; content: string }[]): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Sen Türk hukuk sisteminde uzman bir yapay zeka asistanısın. Türkiye\'deki mahkemeler, yasalar ve hukuki süreçler hakkında bilgi veriyorsun. Yanıtlarını Türkçe ver ve mümkün olduğunca somut, pratik bilgiler sun.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API hatası');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Yanıt alınamadı';
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Sohbet sırasında bir hata oluştu');
  }
}
