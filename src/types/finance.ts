/**
 * Finance types for Asaas SDK
 */

export interface AsaasFinancialTransaction {
  object?: string;
  id: string;
  value: number;
  balance: number;
  type: string;
  date: string;
  description?: string;
  paymentId?: string;
  splitId?: string;
  transferId?: string;
  anticipationId?: string;
  billId?: string;
  invoiceId?: string;
}

export interface AsaasAccountBalance {
  balance: number;
}

export interface AsaasPaymentStatistics {
  pending?: number;
  overdue?: number;
  received?: number;
  confirmed?: number;
}

export interface AsaasListFinancialTransactionsParams {
  offset?: number;
  limit?: number;
  startDate?: string;
  finishDate?: string;
  order?: "asc" | "desc";
}
