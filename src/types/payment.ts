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
 * Request interface for creating a payment
 */
export interface AsaasPaymentCreateRequest {
  customer: string;
  billingType: AsaasBillingType;
  value: number;
  dueDate: string;
  description?: string;
  daysAfterDueDateToRegistrationCancellation?: number;
  externalReference?: string;
  installmentCount?: number;
  totalValue?: number;
  installmentValue?: number;
  discount?: {
    value?: number;
    dueDateLimitDays?: number;
    type?: "FIXED" | "PERCENTAGE";
  };
  interest?: { value?: number };
  fine?: { value?: number; type?: "FIXED" | "PERCENTAGE" };
  postalService?: boolean;
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
}

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
