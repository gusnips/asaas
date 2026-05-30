/**
 * Common types and enums used across the Asaas SDK
 */

/**
 * Billing Types for Asaas
 */
export enum AsaasBillingType {
  UNDEFINED = "UNDEFINED",
  BOLETO = "BOLETO",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  PIX = "PIX",
}

/**
 * Error structure returned by Asaas API
 */
export interface AsaasError {
  code: string;
  description: string;
}

/**
 * Custom error class for Asaas API errors
 */
export class AsaasApiError extends Error {
  status: number;
  errors: AsaasError[];

  constructor(message: string, status: number, errors: AsaasError[] = []) {
    super(message);
    this.name = "AsaasApiError";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * API Response structure
 */
export interface AsaasApiResponse<T> {
  data: T;
  status: number;
}

/**
 * API Paginated Response structure
 */
export interface AsaasApiPaginatedResponse<T> {
  data: T[];
  totalCount: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Discount type for Asaas
 */
export enum AsaasDiscountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

/**
 * Fine type for Asaas
 */
export enum AsaasFineType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

/**
 * Environment type for Asaas API
 */
export type AsaasEnvironment = "production" | "sandbox";

/**
 * Delete response structure from Asaas API
 */
export interface AsaasDeleteResponse {
  deleted: boolean;
  id: string;
}
