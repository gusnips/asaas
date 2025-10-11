/**
 * Asaas API client configuration using Axios
 */

import axios, { AxiosError, AxiosInstance } from "axios";
import { AsaasApiError, AsaasError, AsaasEnvironment } from "../types/index.ts";

/**
 * Create an Asaas API client instance
 * @param apiKey - Asaas API key
 * @param env - Environment (production or sandbox)
 * @returns Axios instance configured for Asaas API
 */
export const createAsaasClient = (
  apiKey: string,
  env: AsaasEnvironment = "production"
): AxiosInstance => {
  // Ensure API key starts with $
  const formattedApiKey = apiKey.startsWith("$") ? apiKey : `$${apiKey}`;

  // Set base URL based on environment
  const baseURL =
    env === "production"
      ? "https://api.asaas.com/v3"
      : "https://sandbox.asaas.com/api/v3";

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      access_token: formattedApiKey,
    },
  });

  // Add a response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // outside the 2xx range
        const { data, status } = error.response;
        const errorData = data as Record<string, unknown>;

        // Extract error information according to Asaas API documentation
        let errorMessage = "Unknown error from Asaas API";
        let errorArray: AsaasError[] = [];

        // Format described in https://docs.asaas.com/reference/codigos-http-das-respostas
        if (errorData.errors && Array.isArray(errorData.errors)) {
          errorArray = errorData.errors as AsaasError[];
          if (errorArray.length > 0) {
            errorMessage = errorArray[0]?.description || errorMessage;
          }
        } else if (typeof errorData.message === "string") {
          errorMessage = errorData.message;
        }

        // Map HTTP status codes to meaningful errors
        switch (status) {
          case 400:
            errorMessage = `Invalid request: ${errorMessage}`;
            break;
          case 401:
            errorMessage = `Unauthorized: ${errorMessage || "Invalid API key"}`;
            break;
          case 403:
            errorMessage = "Forbidden: Request not authorized";
            break;
          case 404:
            errorMessage = `Not found: ${errorMessage}`;
            break;
          case 429:
            errorMessage = "Too many requests: Rate limit exceeded";
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            errorMessage = `Server error (${status}): ${errorMessage}`;
            break;
        }

        return Promise.reject(
          new AsaasApiError(errorMessage, status, errorArray)
        );
      } else if (error.request) {
        // The request was made but no response was received
        return Promise.reject(
          new AsaasApiError("No response received from Asaas API", 0)
        );
      } else {
        // Something happened in setting up the request
        return Promise.reject(
          new AsaasApiError(`Error setting up request: ${error.message}`, 0)
        );
      }
    }
  );

  return instance;
};
