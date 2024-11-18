import { useEffect } from "react";
import { useApiStore, Dataset } from "../store";
import useMyStore from "../store";
import { apiKey } from "../utils/baseUrlAndEndpoints";

interface UseApiOptions {
  headers?: HeadersInit;
}

function useApi(url: string, options?: UseApiOptions) {
  const {
    data,
    isLoading,
    isError,
    errorMessage,
    setData,
    setIsLoading,
    setIsError,
    setErrorMessage,
  } = useApiStore();
  const { accessToken } = useMyStore();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);

        const headers = {
          ...options?.headers,
          Authorization: `Bearer ${accessToken}`,
          "x-api-key": apiKey,
        };

        const response = await fetch(url, {
          headers,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json: Dataset[] = await response.json();
        setData(json);
      } catch (error) {
        setIsError(true);
        setErrorMessage(`No data available: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [
    url,
    options,
    accessToken,
    setData,
    setIsLoading,
    setIsError,
    setErrorMessage,
  ]);

  return { data, isLoading, isError, errorMessage };
}

export default useApi;
