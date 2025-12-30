
import asyncio
import sys
import os
import logging
from typing import List, Dict, Any, Optional

# Ensure yargi-mcp is in the path to import inner modules
YARGI_MCP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'yargi-mcp')
if YARGI_MCP_DIR not in sys.path:
    sys.path.insert(0, YARGI_MCP_DIR)

try:
    # Bedesten Modules
    from bedesten_mcp_module.client import BedestenApiClient
    from bedesten_mcp_module.models import BedestenSearchRequest, BedestenSearchData
    
    # Yargitay Modules
    from yargitay_mcp_module.client import YargitayOfficialApiClient
    from yargitay_mcp_module.models import YargitayDetailedSearchRequest

except ImportError as e:
    print(f"Error importing Yargi-MCP modules: {e}")
    sys.exit(1)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("YargiService")

class YargiService:
    """
    Unified service for searching Turkish legal decisions.
    Prioritizes Bedesten (Unified) but falls back to specific courts if needed.
    """
    
    def __init__(self):
        self.bedesten_client = BedestenApiClient()
        self.yargitay_client = YargitayOfficialApiClient()

    async def search_bedesten(
        self,
        phrase: str,
        court_types: List[str] = ["YARGITAYKARARI", "DANISTAYKARAR"],
        page_number: int = 1,
        birim_adi: str = "ALL"
    ) -> Dict[str, Any]:
        """
        Search using Bedesten API (Unified).
        """
        search_data = BedestenSearchData(
            pageSize=10,
            pageNumber=page_number,
            itemTypeList=court_types,
            phrase=phrase,
            birimAdi=birim_adi
        )
        request = BedestenSearchRequest(data=search_data)
        
        logger.info(f"Searching Bedesten: {phrase}")
        response = await self.bedesten_client.search_documents(request)
        
        if not response.data:
            return {"results": [], "total": 0}
            
        results = [d.model_dump() for d in (response.data.emsalKararList or [])]
        return {
            "source": "bedesten",
            "results": results,
            "total": response.data.total or 0
        }

    async def search_yargitay(
        self,
        phrase: str,
        page_number: int = 1
    ) -> Dict[str, Any]:
        """
        Search using Yargitay API (Specific).
        """
        request = YargitayDetailedSearchRequest(
            arananKelime=phrase,
            pageNumber=page_number,
            pageSize=10
        )
        
        logger.info(f"Searching Yargitay: {phrase}")
        response = await self.yargitay_client.search_detailed_decisions(request)
        
        if not response.data:
            return {"results": [], "total": 0}
            
        results = [d.model_dump() for d in response.data.data]
        return {
            "source": "yargitay",
            "results": results,
            "total": response.data.recordsTotal
        }

    async def get_document(self, doc_id: str, source: str) -> Dict[str, Any]:
        """
        Fetch document content as Markdown.
        """
        if source == "bedesten":
            res = await self.bedesten_client.get_document_as_markdown(doc_id)
            return res.model_dump()
        elif source == "yargitay":
            res = await self.yargitay_client.get_decision_document_as_markdown(doc_id)
            return res.model_dump()
        else:
            raise ValueError(f"Unknown source: {source}")

    async def close(self):
        await self.bedesten_client.close_client_session()
        await self.yargitay_client.close_client_session()

async def main():
    service = YargiService()
    search_term = "iş kazası" # Common term likely to exist
    
    try:
        # Try Bedesten first
        try:
            print(f"\n--- Trying Bedesten Search for '{search_term}' ---")
            results = await service.search_bedesten(search_term)
            print(f"Bedesten found {results['total']} results.")
            source = "bedesten"
        except Exception as e:
            print(f"Bedesten failed: {e}")
            print("\n--- Falling back to Yargitay Search ---")
            results = await service.search_yargitay(search_term)
            print(f"Yargitay found {results['total']} results.")
            source = "yargitay"

        if results and results['results']:
            first = results['results'][0]
            # Handle different ID fields
            doc_id = first.get('documentId') or first.get('id')
            print(f"First Result ID: {doc_id}")
            
            # Fetch content
            print(f"\n--- Fetching Document Content ({source}) ---")
            content = await service.get_document(doc_id, source)
            markdown = content.get('markdown_content', '')
            print(f"Content Preview:\n{markdown[:300]}...\n")
            print(f"Source URL: {content.get('source_url')}")
            
    finally:
        await service.close()

if __name__ == "__main__":
    asyncio.run(main())
