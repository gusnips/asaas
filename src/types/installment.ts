/**
 * Installment-related types for Asaas SDK
 */

import { AsaasBillingType } from "./common.ts";

export interface AsaasInstallment {
  object?: string;
  id: string;
  value: number;
  netValue?: number;
  paymentValue?: number;
  installmentCount: number;
  billingType: AsaasBillingType;
  paymentDate?: string;
  description?: string;
  expirationDay?: number;
  dateCreated?: string;
  customer: string;
  paymentLink?: string;
  checkoutSession?: string;
  transactionReceiptUrl?: string;
  deleted?: boolean;
}

export interface AsaasInstallmentCreateRequest {
  installmentCount: number;
  customer: string;
  value: number;
  billingType: AsaasBillingType;
  dueDate: string;
  totalValue?: number;
  description?: string;
  postalService?: boolean;
  daysAfterDueDateToRegistrationCancellation?: number;
  paymentExternalReference?: string;
  discount?: {
    value?: number;
    dueDateLimitDays?: number;
    type?: "FIXED" | "PERCENTAGE";
  };
  interest?: { value?: number };
  fine?: { value?: number; type?: "FIXED" | "PERCENTAGE" };
  splits?: Array<{
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
    totalFixedValue?: number;
    externalReference?: string;
    description?: string;
    installmentNumber?: number;
  }>;
}
