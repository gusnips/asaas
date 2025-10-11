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
  limit?: number;
  offset?: number;
  billingType?: AsaasBillingType;
  status?: AsaasPaymentStatus;
  paymentDate?: string;
  invoiceStatus?: AsaasInvoiceStatus;
  subscription?: string;
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
