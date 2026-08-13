import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/client';

export function useSanityPage<T>(query: string, fallback: T, params: Record<string, unknown> = {}): {
  data: T;
  isLoading: boolean;
} {
  const [data, setData] = useState<T>(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch<T>(query, params)
      .then((result) => {
        if (!cancelled && result !== null && result !== undefined) {
          if (Array.isArray(result)) {
            setData(result);
          } else if (typeof result === 'object' && typeof fallback === 'object' && fallback !== null) {
            setData({ ...fallback, ...result });
          } else {
            setData(result);
          }
        }
      })
      .catch((err: unknown) => {
        console.warn('[Sanity] Fetch failed, using static fallback:', err instanceof Error ? err.message : String(err));
        // data stays as fallback — site NEVER breaks
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)]);

  return { data, isLoading };
}
