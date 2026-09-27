/**
 * Installment-related types for Asaas SDK
 */

import { AsaasBillingType } from "./common.ts";
import type { AsaasCreditCardTokenizationRequest } from "./payment.ts";

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

export interface AsaasInstallmentCreateBase {
  installmentCount: number;
  customer: string;
  billingType: AsaasBillingType;
  dueDate: string;
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
  creditCard?: AsaasCreditCardTokenizationRequest["creditCard"];
  creditCardHolderInfo?: AsaasCreditCardTokenizationRequest["creditCardHolderInfo"];
  creditCardToken?: string;
  /** The buyer's IP. Asaas requires it on a card charge. */
  remoteIp?: string;
}

/**
 * The amount is `totalValue`, the whole plan, or `value`, ONE installment. Asaas
 * takes either, and answers a request with neither with 400
 * `invalid_installmentValue`. Sent together, `totalValue` wins and `value` is
 * ignored: 5 each with a total of 12 comes out 6 and 6. Asaas divides a total
 * itself and puts the leftover cent on the LAST installment: 100 in 3 is
 * 33.33, 33.33, 33.34. Measured in the sandbox, 2026-09-27. Listing them with
 * `payments.list({ installment })` returns the last one first, so sort by
 * `installmentNumber` before reading an order off them.
 */
export type AsaasInstallmentCreateRequest = AsaasInstallmentCreateBase &
  ({ totalValue: number; value?: number } | { value: number; totalValue?: number });
