/**
 * Payment-related types for Asaas SDK
 */

import { AsaasBillingType } from "./common.ts";

/**
 * Payment Status for Asaas
 */
export enum AsaasPaymentStatus {
  PENDING = "PENDING",
  RECEIVED = "RECEIVED",
  CONFIRMED = "CONFIRMED",
  OVERDUE = "OVERDUE",
  REFUNDED = "REFUNDED",
  RECEIVED_IN_CASH = "RECEIVED_IN_CASH",
  REFUND_REQUESTED = "REFUND_REQUESTED",
  REFUND_IN_PROGRESS = "REFUND_IN_PROGRESS",
  CHARGEBACK_REQUESTED = "CHARGEBACK_REQUESTED",
  CHARGEBACK_DISPUTE = "CHARGEBACK_DISPUTE",
  AWAITING_CHARGEBACK_REVERSAL = "AWAITING_CHARGEBACK_REVERSAL",
  CANCELLED = "CANCELLED",
  CHARGEBACK = "CHARGEBACK",
  DUNNING_REQUESTED = "DUNNING_REQUESTED",
  DUNNING_RECEIVED = "DUNNING_RECEIVED",
  AWAITING_RISK_ANALYSIS = "AWAITING_RISK_ANALYSIS",
}

/**
 * Invoice status for Asaas
 */
export enum AsaasInvoiceStatus {
  SCHEDULED = "SCHEDULED",
  AUTHORIZED = "AUTHORIZED",
  PROCESSING_CANCELLATION = "PROCESSING_CANCELLATION",
  CANCELED = "CANCELED",
  CANCELLATION_DENIED = "CANCELLATION_DENIED",
  ERROR = "ERROR",
}

/**
 * PIX QR Code response structure
 */
export interface AsaasPixQrCode {
  encodedImage: string;
  payload: string;
  expirationDate: string;
}

/**
 * Boleto information response structure
 */
export interface AsaasBoletoInfo {
  barCode: string;
  identificationField: string;
  nossoNumero: string;
}

/**
 * Credit Card token response structure
 */
export interface AsaasCreditCardToken {
  creditCardToken: string;
  creditCardNumber: string;
  creditCardBrand: string;
}

/**
 * Payment entity structure
 * Based on Asaas API documentation: https://docs.asaas.com/reference/criar-nova-cobranca
 */
export interface AsaasPayment {
  object?: string;
  id: string;
  dateCreated?: string;
  customer: string;
  checkoutSession?: string;
  subscription?: string;
  installment?: string;
  paymentLink?: string;
  value: number;
  netValue?: number;
  originalValue?: number;
  interestValue?: number;
  description?: string;
  billingType: AsaasBillingType;
  creditCard?: AsaasCreditCardToken;
  canBePaidAfterDueDate?: boolean;
  pixTransaction?: string;
  pixQrCodeId?: string;
  status: AsaasPaymentStatus;
  dueDate: string;
  originalDueDate?: string;
  paymentDate?: string;
  clientPaymentDate?: string;
  installmentNumber?: number;
  invoiceUrl?: string;
  invoiceNumber?: string;
  externalReference?: string;
  deleted?: boolean;
  anticipated?: boolean;
  anticipable?: boolean;
  creditDate?: string;
  estimatedCreditDate?: string;
  transactionReceiptUrl?: string;
  nossoNumero?: string;
  bankSlipUrl?: string;
  discount?: {
    value?: number;
    dueDateLimitDays?: number;
    type?: "FIXED" | "PERCENTAGE";
  };
  fine?: {
    value?: number;
  };
  interest?: {
    value?: number;
  };
  split?: Array<{
    id?: string;
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
    totalValue?: number;
    cancellationReason?: string;
    status?: string;
    externalReference?: string;
    description?: string;
  }>;
  postalService?: boolean;
  daysAfterDueDateToRegistrationCancellation?: number;
  chargeback?: {
    id: string;
    payment: string;
    installment?: string;
    customerAccount: string;
    status: string;
    reason: string;
    disputeStartDate?: string;
    value: number;
    paymentDate?: string;
    creditCard?: {
      disputeStatus?: string;
      deadlineToSendDisputeDocuments?: string;
    };
  };
  escrow?: {
    id: string;
    status: string;
    expirationDate?: string;
    finishDate?: string;
    finishReason?: string;
  };
  refunds?: Array<{
    dateCreated: string;
    status: string;
    value: number;
    endToEndIdentifier?: string;
    description?: string;
    effectiveDate?: string;
    transactionReceiptUrl?: string;
    refundedSplits?: Array<{
      id: string;
      value: number;
      done: boolean;
    }>;
  }>;
}

/**
 * Payment billing info structure
 */
export interface AsaasPaymentBillingInfo {
  creditCard?: AsaasCreditCardToken;
  pix?: AsaasPixQrCode;
  bankSlip?: AsaasBoletoInfo;
}

/**
 * Options for listing payments
 */
export interface AsaasListPaymentsOptions {
  offset?: number;
  limit?: number;
  customer?: string;
  customerGroupName?: string;
  billingType?: AsaasBillingType;
  status?: AsaasPaymentStatus;
  subscription?: string;
  installment?: string;
  externalReference?: string;
  paymentDate?: string;
  invoiceStatus?: AsaasInvoiceStatus;
  estimatedCreditDate?: string;
  pixQrCodeId?: string;
  anticipated?: boolean;
  anticipable?: boolean;
  "dateCreated[ge]"?: string;
  "dateCreated[le]"?: string;
  "paymentDate[ge]"?: string;
  "paymentDate[le]"?: string;
  "estimatedCreditDate[ge]"?: string;
  "estimatedCreditDate[le]"?: string;
  "dueDate[ge]"?: string;
  "dueDate[le]"?: string;
  user?: string;
  checkoutSession?: string;
}

/**
 * Fields a create-payment request carries whether it is one charge or a
 * charge split into installments.
 */
export interface AsaasPaymentCreateBase {
  customer: string;
  billingType: AsaasBillingType;
  dueDate: string;
  description?: string;
  daysAfterDueDateToRegistrationCancellation?: number;
  externalReference?: string;
  discount?: {
    value?: number;
    dueDateLimitDays?: number;
    type?: "FIXED" | "PERCENTAGE";
  };
  interest?: { value?: number };
  fine?: { value?: number; type?: "FIXED" | "PERCENTAGE" };
  postalService?: boolean;
  /**
   * On an installment charge, `fixedValue` is paid out on EVERY installment
   * (10 on a 3x charge pays 30), and `totalFixedValue` is divided across them
   * (3.33 + 3.33 + 3.34). There is no "first installment only" on this
   * endpoint: an `installmentNumber` here is ignored without an error. That
   * needs `installments.create`.
   */
  split?: Array<{
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
    totalFixedValue?: number;
    externalReference?: string;
    description?: string;
  }>;
  callback?: {
    successUrl: string;
    autoRedirect?: boolean;
  };
  /** A card charge: the card itself, or `creditCardToken` from `tokenizeCreditCard`. */
  creditCard?: AsaasCreditCardTokenizationRequest["creditCard"];
  creditCardHolderInfo?: AsaasCreditCardTokenizationRequest["creditCardHolderInfo"];
  creditCardToken?: string;
  /** The buyer's IP. Asaas requires it on a card charge. */
  remoteIp?: string;
}

/** One charge, for `value`. */
export interface AsaasSinglePaymentCreateRequest extends AsaasPaymentCreateBase {
  value: number;
  /** Any count, 1 included, makes it an installment charge, where `value` is refused. */
  installmentCount?: never;
}

/**
 * One charge split into `installmentCount` installments, all under one
 * `installment` id. Send `totalValue` and Asaas divides it, or
 * `installmentValue` for each installment. `value` is refused here, whatever
 * the count: Asaas answers 400 `invalid_installmentValue`.
 *
 * Prefer `totalValue`. Asaas puts its leftover cent on the FIRST installment
 * (100 in 3 is 33.34, 33.33, 33.33), while `installmentValue` alone is
 * multiplied (33.33 in 3 charges 99.99). Sent together, `totalValue` wins and
 * `installmentValue` is ignored. Measured in the sandbox, 2026-09-27.
 *
 * On a card, every installment must be at least R$ 5,00.
 */
export type AsaasInstallmentPaymentCreateRequest = AsaasPaymentCreateBase & {
  installmentCount: number;
  value?: never;
} & ({ totalValue: number; installmentValue?: number } | { installmentValue: number; totalValue?: number });

/** Request for creating a payment: one charge, or one split into installments. */
export type AsaasPaymentCreateRequest =
  | AsaasSinglePaymentCreateRequest
  | AsaasInstallmentPaymentCreateRequest;

/**
 * Credit card tokenization request
 */
export interface AsaasCreditCardTokenizationRequest {
  customer: string;
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string;
    phone?: string;
    mobilePhone?: string;
  };
  remoteIp: string;
}
