"""
Supabase Vector Store with pgvector extension
Replaces in-memory VectorStore with persistent Supabase storage
"""

import logging
import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime

from supabase_client import get_supabase

logger = logging.getLogger(__name__)


@dataclass
class StoredDocument:
    """Document stored in Supabase"""
    id: str
    text: str
    embedding: Optional[np.ndarray]
    metadata: Dict[str, Any]
    created_at: datetime
    updated_at: datetime

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary (excluding embedding for JSON serialization)"""
        return {
            'id': self.id,
            'text': self.text,
            'metadata': self.metadata,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class SupabaseVectorStore:
    """
    Persistent vector store using Supabase pgvector extension

    Features:
    - Persistent document storage
    - Vector similarity search with cosine distance
    - Automatic indexing with ivfflat
    - Metadata filtering
    - TTL support for automatic cleanup
    """

    TABLE_NAME = "mcp_documents"
    VECTOR_FUNCTION = "match_mcp_documents"
    DIMENSION = 768  # Default embedding dimension

    def __init__(
        self,
        dimension: int = DIMENSION,
        similarity_threshold: float = 0.7,
        max_results: int = 10
    ):
        """
        Initialize Supabase vector store

        Args:
            dimension: Embedding vector dimension
            similarity_threshold: Minimum similarity score (0-1)
            max_results: Maximum number of results to return
        """
        self.dimension = dimension
        self.similarity_threshold = similarity_threshold
        self.max_results = max_results
        self.supabase = get_supabase()

        logger.info(
            f"SupabaseVectorStore initialized: "
            f"dim={dimension}, threshold={similarity_threshold}"
        )

    def add_documents(
        self,
        ids: List[str],
        texts: List[str],
        embeddings: np.ndarray,
        metadata: Optional[List[Dict[str, Any]]] = None,
        ttl_days: int = 30
    ) -> int:
        """
        Add documents to Supabase with embeddings

        Args:
            ids: Document IDs
            texts: Document texts
            embeddings: Embedding vectors (N x dimension)
            metadata: Optional metadata for each document
            ttl_days: Time-to-live in days (auto-delete after)

        Returns:
            Number of documents added
        """
        if len(ids) != len(texts) or len(ids) != embeddings.shape[0]:
            raise ValueError("Mismatched lengths for ids, texts, and embeddings")

        if metadata and len(metadata) != len(ids):
            raise ValueError("Metadata length doesn't match document count")

        # Prepare batch insert data
        documents = []
        for i in range(len(ids)):
            doc_data = {
                "id": ids[i],
                "text": texts[i],
                "embedding": embeddings[i].tolist(),
                "metadata": metadata[i] if metadata else {},
                "expires_at": f"now() + interval '{ttl_days} days'"
            }
            documents.append(doc_data)

        # Batch insert with upsert
        try:
            result = self.supabase.table(self.TABLE_NAME).upsert(
                documents,
                on_conflict="id"
            ).execute()

            logger.info(f"Added {len(ids)} documents to Supabase")
            return len(ids)

        except Exception as e:
            logger.error(f"Error adding documents: {e}")
            raise

    def search(
        self,
        query_embedding: np.ndarray,
        filters: Optional[Dict[str, Any]] = None,
        limit: Optional[int] = None
    ) -> List[StoredDocument]:
        """
        Search similar documents using vector similarity

        Args:
            query_embedding: Query vector
            filters: Optional metadata filters (PostgreSQL JSONB operators)
            limit: Max results (defaults to self.max_results)

        Returns:
            List of similar documents with similarity scores
        """
        limit = limit or self.max_results

        try:
            # Call Supabase RPC function for vector search
            params = {
                "query_embedding": query_embedding.tolist(),
                "match_threshold": self.similarity_threshold,
                "match_count": limit
            }

            # Add metadata filters if provided
            if filters:
                params["filter_metadata"] = filters

            result = self.supabase.rpc(self.VECTOR_FUNCTION, params).execute()

            # Parse results
            documents = []
            for row in result.data:
                doc = StoredDocument(
                    id=row['id'],
                    text=row['text'],
                    embedding=np.array(row['embedding']) if row.get('embedding') else None,
                    metadata=row.get('metadata', {}),
                    created_at=datetime.fromisoformat(row['created_at']),
                    updated_at=datetime.fromisoformat(row['updated_at'])
                )
                documents.append(doc)

            logger.info(f"Found {len(documents)} similar documents")
            return documents

        except Exception as e:
            logger.error(f"Error searching documents: {e}")
            return []

    def get_document(self, doc_id: str) -> Optional[StoredDocument]:
        """Get a specific document by ID"""
        try:
            result = self.supabase.table(self.TABLE_NAME).select(
                "*"
            ).eq("id", doc_id).execute()

            if not result.data:
                return None

            row = result.data[0]
            return StoredDocument(
                id=row['id'],
                text=row['text'],
                embedding=np.array(row['embedding']) if row.get('embedding') else None,
                metadata=row.get('metadata', {}),
                created_at=datetime.fromisoformat(row['created_at']),
                updated_at=datetime.fromisoformat(row['updated_at'])
            )

        except Exception as e:
            logger.error(f"Error getting document {doc_id}: {e}")
            return None

    def delete_document(self, doc_id: str) -> bool:
        """Delete a document by ID"""
        try:
            self.supabase.table(self.TABLE_NAME).delete().eq("id", doc_id).execute()
            logger.info(f"Deleted document: {doc_id}")
            return True
        except Exception as e:
            logger.error(f"Error deleting document {doc_id}: {e}")
            return False

    def cleanup_expired(self) -> int:
        """Remove expired documents based on expires_at"""
        try:
            result = self.supabase.table(self.TABLE_NAME).delete().lt(
                "expires_at",
                "now()"
            ).execute()

            count = len(result.data) if result.data else 0
            logger.info(f"Cleaned up {count} expired documents")
            return count

        except Exception as e:
            logger.error(f"Error cleaning up expired documents: {e}")
            return 0

    def get_stats(self) -> Dict[str, Any]:
        """Get storage statistics"""
        try:
            # Count total documents
            count_result = self.supabase.table(self.TABLE_NAME).select(
                "id", count="exact"
            ).execute()

            # Count expired documents
            expired_result = self.supabase.table(self.TABLE_NAME).select(
                "id", count="exact"
            ).lt("expires_at", "now()").execute()

            return {
                "total_documents": count_result.count or 0,
                "expired_documents": expired_result.count or 0,
                "dimension": self.dimension
            }

        except Exception as e:
            logger.error(f"Error getting stats: {e}")
            return {"error": str(e)}
