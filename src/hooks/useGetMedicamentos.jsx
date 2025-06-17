import { useEffect, useState } from "react";

export function useGetMedicamentos() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/medicamentos`;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data || json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { result, loading, error };
}
