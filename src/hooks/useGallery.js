import { useState, useEffect, useCallback } from 'react';
import { getGalleryItems } from '../lib/supabase';

export function useGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getGalleryItems();
      if (result?.isFallback) {
        setItems(result.data);
        setIsFallback(true);
      } else if (Array.isArray(result)) {
        setItems(result);
        setIsFallback(false);
      } else {
        setItems([]);
        setIsFallback(true);
      }
    } catch {
      setItems([]);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, isFallback, refetch: fetchItems };
}
