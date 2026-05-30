/**
 * PIX types for Asaas SDK
 */

import { AsaasPixAddressKeyType } from "./transfer.ts";

export enum AsaasPixTransactionStatus {
  AWAITING_BALANCE_VALIDATION = "AWAITING_BALANCE_VALIDATION",
  AWAITING_INSTANT_PAYMENT_ACCOUNT_BALANCE = "AWAITING_INSTANT_PAYMENT_ACCOUNT_BALANCE",
  AWAITING_CRITICAL_ACTION_AUTHORIZATION = "AWAITING_CRITICAL_ACTION_AUTHORIZATION",
  SCHEDULED = "SCHEDULED",
  AWAITING_REQUEST = "AWAITING_REQUEST",
  REQUESTED = "REQUESTED",
  DONE = "DONE",
  REFUSED = "REFUSED",
  CANCELLED = "CANCELLED",
}

export enum AsaasPixTransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  CREDIT_REFUND = "CREDIT_REFUND",
  DEBIT_REFUND = "DEBIT_REFUND",
  DEBIT_REFUND_CANCELLATION = "DEBIT_REFUND_CANCELLATION",
}

export interface AsaasPixTransaction {
  id: string;
  endToEndIdentifier?: string;
  value: number;
  changeValue?: number;
  refundedValue?: number;
  effectiveDate?: string;
  scheduledDate?: string;
  status: AsaasPixTransactionStatus;
  type: AsaasPixTransactionType;
  originType?: string;
  description?: string;
  transactionReceiptUrl?: string;
  canBeCanceled?: boolean;
  payment?: string;
  canBeRefunded?: boolean;
  chargedFeeValue?: number;
  dateCreated?: string;
  addressKey?: string;
  addressKeyType?: AsaasPixAddressKeyType;
  transferId?: string;
  externalReference?: string;
  externalAccount?: {
    ispb?: string;
    ispbName?: string;
    name?: string;
    cpfCnpj?: string;
    addressKey?: string;
    addressKeyType?: AsaasPixAddressKeyType;
  };
}

export interface AsaasPixAddressKey {
  id: string;
  key: string;
  type: AsaasPixAddressKeyType;
  status?: string;
  dateCreated?: string;
  canBeDeleted?: boolean;
}

export interface AsaasPixQrCodeCreateRequest {
  addressKey: string;
  description?: string;
  value?: number;
  format?: string;
  expirationDate?: string;
  expirationSeconds?: number;
  allowsMultiplePayments?: boolean;
}

export interface AsaasListPixTransactionsParams {
  offset?: number;
  limit?: number;
  status?: AsaasPixTransactionStatus;
  type?: AsaasPixTransactionType;
  endToEndIdentifier?: string;
}
