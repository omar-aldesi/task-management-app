"use client";

import { useCallback, useRef, useState } from "react";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isExecuting = useRef(false);

  const call = useCallback(async (apiFunction: () => Promise<any>) => {
    // Prevent concurrent calls
    if (isExecuting.current) {
      console.warn("API call already in progress, skipping...");
      return null;
    }

    isExecuting.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction();
      setLoading(false);
      isExecuting.current = false;
      return result;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      isExecuting.current = false;
      return null;
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { call, loading, error, setError: resetError };
}
