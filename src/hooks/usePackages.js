import { useState, useEffect, useCallback } from 'react';
import { getPackages, fallbackData } from '../lib/supabase';

export function usePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPackages();
      if (result?.isFallback) {
        setPackages(result.data);
        setIsFallback(true);
        setShowBanner(true);
      } else if (Array.isArray(result)) {
        setPackages(result);
        setIsFallback(false);
      } else {
        setPackages(fallbackData);
        setIsFallback(true);
        setShowBanner(true);
      }
    } catch (err) {
      setError(err.message);
      setPackages(fallbackData);
      setIsFallback(true);
      setShowBanner(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const dismissBanner = () => setShowBanner(false);

  return { packages, loading, error, isFallback, showBanner, dismissBanner, refetch: fetchPackages };
}
