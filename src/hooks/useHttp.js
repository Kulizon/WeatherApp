import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(url, options);

      const data = await response.json();

      setIsLoading(false);
      return data;

    } catch (e) {
      setIsLoading(false);
      setError(e);
      console.log(e);
    }
  }, []);

  return [fetchData, isLoading, error];
};

export default useHttp;
