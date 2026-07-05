import { useState, useCallback } from "react";

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (fn: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Request failed.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
  }, []);

  return { data, setData, loading, error, fetch, retry };
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="page-content">
      <div className="panel" style={{ textAlign: "center", padding: "3rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Unable to reach backend</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>{message}</p>
        <button className="icon-button" onClick={onRetry} style={{ padding: "0.5rem 1.5rem" }}>
          Retry
        </button>
      </div>
    </div>
  );
}