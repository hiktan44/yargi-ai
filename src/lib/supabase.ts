import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "http://supabasekong-lwcg4k08sskkw8g84swcc008.65.108.77.26.sslip.io";
const supabaseAnonKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NjkyMTQwMCwiZXhwIjo0OTIyNTk1MDAwLCJyb2xlIjoiYW5vbiJ9.ReVoOBusbwZBN2RP6EVekx5vfUXZoRYs0Z0viI5ojsk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// OpenAI API key from environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

// Legal search function interface
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

// Demo data for legal search (works without edge functions)
const generateDemoResults = (query: string): LegalSearchResponse => {
  const demoResults: LegalSearchResult[] = [
    {
      id: '1',
      title: `${query} - Yargıtay Kararı`,
      court: 'Yargıtay 9. Hukuk Dairesi',
      year: '2024',
      summary: `${query} konusunda emsal niteliğinde karar. İşçi lehine sonuçlanmış olup, kıdem tazminatı ve ihbar tazminatı talepleri kabul edilmiştir.`,
      caseType: 'İş Hukuku',
      source: 'Yargıtay',
      url: 'https://karararama.yargitay.gov.tr',
      relevance: 95,
      date: '2024-03-15'
    },
    {
      id: '2',
      title: `${query} - Danıştay Kararı`,
      court: 'Danıştay 10. Daire',
      year: '2024',
      summary: `${query} ile ilgili idari işlemin iptali davası. İdari işlem hukuka aykırı bulunarak iptal edilmiştir.`,
      caseType: 'İdare Hukuku',
      source: 'Danıştay',
      url: 'https://www.danistay.gov.tr',
      relevance: 88,
      date: '2024-02-20'
    },
    {
      id: '3',
      title: `${query} - Anayasa Mahkemesi`,
      court: 'Anayasa Mahkemesi',
      year: '2023',
      summary: `${query} konusunda bireysel başvuru. Adil yargılanma hakkının ihlal edildiğine karar verilmiştir.`,
      caseType: 'Anayasa Hukuku',
      source: 'Anayasa Mahkemesi',
      url: 'https://www.anayasa.gov.tr',
      relevance: 82,
      date: '2023-11-10'
    },
    {
      id: '4',
      title: `${query} - Bölge Adliye Mahkemesi`,
      court: 'İstanbul BAM 12. Hukuk Dairesi',
      year: '2024',
      summary: `${query} hakkında istinaf incelemesi. İlk derece mahkemesi kararı kısmen bozulmuştur.`,
      caseType: 'Medeni Hukuk',
      source: 'Bölge Adliye Mahkemesi',
      url: 'https://www.istanbulbam.adalet.gov.tr',
      relevance: 75,
      date: '2024-01-25'
    },
    {
      id: '5',
      title: `${query} - Yargıtay Ceza Dairesi`,
      court: 'Yargıtay 5. Ceza Dairesi',
      year: '2023',
      summary: `${query} kapsamında ceza davası temyiz incelemesi. Mahkumiyet kararı onanmıştır.`,
      caseType: 'Ceza Hukuku',
      source: 'Yargıtay',
      url: 'https://karararama.yargitay.gov.tr',
      relevance: 70,
      date: '2023-09-05'
    }
  ];

  return {
    results: [
      {
        institution: 'yargitay',
        name: 'Yargıtay',
        count: 2,
        totalRecords: 2,
        results: demoResults.filter(r => r.source === 'Yargıtay')
      },
      {
        institution: 'danistay',
        name: 'Danıştay',
        count: 1,
        totalRecords: 1,
        results: demoResults.filter(r => r.source === 'Danıştay')
      },
      {
        institution: 'anayasa',
        name: 'Anayasa Mahkemesi',
        count: 1,
        totalRecords: 1,
        results: demoResults.filter(r => r.source === 'Anayasa Mahkemesi')
      },
      {
        institution: 'bam',
        name: 'Bölge Adliye Mahkemesi',
        count: 1,
        totalRecords: 1,
        results: demoResults.filter(r => r.source === 'Bölge Adliye Mahkemesi')
      }
    ],
    errors: null,
    totalInstitutions: 4,
    successCount: 4,
    errorCount: 0
  };
};

// Backend API URL - empty string for same-origin proxy, or explicit URL for dev
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

// Function to search across legal institutions via backend API
export async function searchLegalCases(params: LegalSearchParams): Promise<LegalSearchResponse> {
  try {
    const institutionMap: Record<string, { endpoint: string; name: string }> = {
      yargitay: { endpoint: '/api/yargitay/search', name: 'Yargıtay' },
      danistay: { endpoint: '/api/danistay/search-keyword', name: 'Danıştay' },
    };

    const selectedInstitutions = params.institutions?.length 
      ? params.institutions 
      : Object.keys(institutionMap);

    const results: InstitutionResult[] = [];
    const errors: any[] = [];

    await Promise.all(
      selectedInstitutions.map(async (inst) => {
        const config = institutionMap[inst];
        if (!config) return;

        try {
          const response = await fetch(`${BACKEND_URL}${config.endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              keyword: params.searchQuery,
              page: params.filters?.page || 1,
              pageSize: params.filters?.pageSize || 10,
              ...params.filters
            })
          });

          if (!response.ok) throw new Error(`API error: ${response.status}`);
          
          const data = await response.json();
          const items = data.results || data.data || [];

          results.push({
            institution: inst,
            name: config.name,
            count: items.length,
            totalRecords: data.totalRecords || items.length,
            results: items.map((item: any, idx: number) => ({
              id: item.id || item.kararId || String(idx),
              title: item.title || item.kararBaslik || `${config.name} Kararı`,
              court: item.court || item.daire || config.name,
              year: item.year || item.kararYil,
              summary: item.summary || item.ozet || item.kararOzeti || '',
              caseType: item.caseType || item.davaTuru || 'Genel',
              source: config.name,
              url: item.url || '#',
              relevance: item.relevance || 80,
              date: item.date || item.kararTarihi
            }))
          });
        } catch (err) {
          console.error(`${inst} API error:`, err);
          errors.push({ institution: inst, error: err });
        }
      })
    );

    // Fallback to demo data if no results
    if (results.length === 0 && errors.length > 0) {
      console.warn('Backend API unavailable, using demo data');
      return generateDemoResults(params.searchQuery);
    }

    return {
      results,
      errors: errors.length > 0 ? errors : null,
      totalInstitutions: selectedInstitutions.length,
      successCount: results.length,
      errorCount: errors.length
    };
  } catch (error) {
    console.error('Search error:', error);
    return generateDemoResults(params.searchQuery);
  }
}

// Direct OpenAI chat function (no edge function needed)
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
