from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import logging
import asyncio
import os

# Mevcut modüllerden importlar
from bedesten_mcp_module.client import BedestenApiClient
from bedesten_mcp_module.models import BedestenSearchRequest
from yargitay_mcp_module.client import YargitayOfficialApiClient
from yargitay_mcp_module.models import YargitayDetailedSearchRequest

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Yargı Arama API Service")

# CORS (Frontend erişimi için)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Güvenlik için production'da domain belirtilmeli
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Clients
bedesten_client = BedestenApiClient()
yargitay_client = YargitayOfficialApiClient()

class SearchQuery(BaseModel):
    query: str

@app.get("/")
def home():
    return {"status": "online", "service": "Yargi API"}

@app.post("/search")
async def search_legal_documents(payload: SearchQuery = Body(...)):
    """
    Yargı kararlarını arar. Önce Bedesten, başarısız olursa Yargıtay'ı dener.
    """
    keyword = payload.query
    logger.info(f"Arama isteği alındı: {keyword}")

    results = []

    # 1. Bedesten Araması
    try:
        logger.info("Bedesten API deneniyor...")
        bedesten_req = BedestenSearchRequest(arananKelime=keyword, pageNumber=1, pageSize=10)
        bedesten_resp = await bedesten_client.search_decisions(bedesten_req)
        
        if bedesten_resp and bedesten_resp.data and bedesten_resp.data.data:
            logger.info(f"Bedesten'den {len(bedesten_resp.data.data)} sonuç geldi.")
            for item in bedesten_resp.data.data:
                results.append({
                    "id": str(item.id),
                    "title": f"Yargıtay Kararı - {item.daire}",
                    "content": f"Esas: {item.esasNo}, Karar: {item.kararNo}, Tarih: {item.kararTarihi}",
                    "url": getattr(item, 'document_url', None) or f"https://karararama.yargitay.gov.tr/getDokuman?id={item.id}",
                    "source": "Bedesten",
                    "metadata": {
                         "daire": item.daire,
                         "esasNo": item.esasNo,
                         "kararNo": item.kararNo,
                         "tarih": item.kararTarihi
                    }
                })
    except Exception as e:
        logger.error(f"Bedesten API hatası: {e}")

    # 2. Yargıtay Araması (Eğer Bedesten boş veya hatalıysa)
    if not results:
        try:
            logger.info("Yargıtay Resmi API deneniyor (Fallback)...")
            yargitay_req = YargitayDetailedSearchRequest(arananKelime=keyword, pageNumber=1)
            yargitay_resp = await yargitay_client.search_detailed_decisions(yargitay_req)

            if yargitay_resp and yargitay_resp.data and yargitay_resp.data.data:
                 logger.info(f"Yargıtay'dan {len(yargitay_resp.data.data)} sonuç geldi.")
                 for item in yargitay_resp.data.data:
                    results.append({
                        "id": str(item.id),
                        "title": f"Yargıtay Kararı - {item.daire}",
                        "content": f"Esas: {item.esasNo}, Karar: {item.kararNo}, Tarih: {item.kararTarihi}",
                        "url": getattr(item, 'document_url', None),
                        "source": "Yargitay",
                        "metadata": {
                             "daire": item.daire,
                             "esasNo": item.esasNo,
                             "kararNo": item.kararNo,
                             "tarih": item.kararTarihi
                        }
                    })
        except Exception as e:
            logger.error(f"Yargıtay API hatası: {e}")

    if not results and not keyword:
         return {"results": [], "message": "Arama terimi boş olamaz."}
    
    return {"results": results, "count": len(results)}

# Supabase Edge Function uyumluluğu için (Opsiyonel: Path'i aynı yapalım)
@app.post("/functions/v1/legal-search")
async def search_proxy(payload: SearchQuery = Body(...)):
    return await search_legal_documents(payload)

if __name__ == "__main__":
    import uvicorn
    # Coolify genellikle 8000 veya PORT env variable'ını kullanır
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
