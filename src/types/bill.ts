/**
 * Bill payment types for Asaas SDK
 */

export enum AsaasBillStatus {
  PENDING = "PENDING",
  BANK_PROCESSING = "BANK_PROCESSING",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export interface AsaasBill {
  object?: string;
  id: string;
  status: AsaasBillStatus;
  value: number;
  discount?: number;
  interest?: number;
  fine?: number;
  identificationField: string;
  dueDate?: string;
  scheduleDate?: string;
  paymentDate?: string;
  fee?: number;
  description?: string;
  companyName?: string;
  transactionReceiptUrl?: string;
  canBeCancelled?: boolean;
  externalReference?: string;
  failReasons?: string[];
}

export interface AsaasBillCreateRequest {
  identificationField: string;
  scheduleDate?: string;
  description?: string;
  discount?: number;
  interest?: number;
  fine?: number;
  dueDate?: string;
  value?: number;
  externalReference?: string;
}
