
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BEDESTEN_API_URL = "https://bedesten.adalet.gov.tr/emsal-karar/searchDocuments";
const BEDESTEN_DOC_URL = "https://bedesten.adalet.gov.tr/emsal-karar/getDocumentContent";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchRequest {
    query: string;
    page?: number;
    courtTypes?: string[]; // e.g., ["YARGITAYKARARI", "DANISTAYKARAR"]
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { query, page = 1, courtTypes = ["YARGITAYKARARI", "DANISTAYKARAR"] } = await req.json() as SearchRequest;

        if (!query) {
            return new Response(
                JSON.stringify({ error: 'Query parameter is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log(`Searching Bedesten for: ${query}`);

        const payload = {
            data: {
                pageSize: 10,
                pageNumber: page,
                itemTypeList: courtTypes,
                phrase: query,
                birimAdi: "ALL",
                kararTarihiStart: "",
                kararTarihiEnd: ""
            },
            applicationName: "UyapMevzuat",
            paging: true
        };

        const response = await fetch(BEDESTEN_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "AdaletApplicationName": "UyapMevzuat",
                "Origin": "https://mevzuat.adalet.gov.tr",
                "Referer": "https://mevzuat.adalet.gov.tr/"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error(`Bedesten API Error: ${response.status} ${response.statusText}`);
            // Fallback or detailed error
            return new Response(
                JSON.stringify({ error: `External API error: ${response.status}` }),
                { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const data = await response.json();

        // Transform data for frontend
        const results = (data.data?.emsalKararList || []).map((item: any) => ({
            id: item.documentId,
            court: item.itemType?.name || "Mahkeme",
            department: item.birimAdi,
            date: item.kararTarihiStr,
            decisionNo: item.kararNo,
            caseNo: item.esasNo,
            summary: item.ozet || "Özet bulunamadı", // Sometimes summary is available
            type: item.kararTuru
        }));

        return new Response(
            JSON.stringify({
                data: results,
                total: data.data?.total || 0,
                page: page
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
