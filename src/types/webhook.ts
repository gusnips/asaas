/**
 * Webhook types for Asaas SDK
 */

export enum AsaasWebhookSendType {
  SEQUENTIALLY = "SEQUENTIALLY",
  NON_SEQUENTIALLY = "NON_SEQUENTIALLY",
}

export type AsaasWebhookEvent =
  | "PAYMENT_AUTHORIZED"
  | "PAYMENT_AWAITING_RISK_ANALYSIS"
  | "PAYMENT_APPROVED_BY_RISK_ANALYSIS"
  | "PAYMENT_REPROVED_BY_RISK_ANALYSIS"
  | "PAYMENT_CREATED"
  | "PAYMENT_UPDATED"
  | "PAYMENT_CONFIRMED"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_ANTICIPATED"
  | "PAYMENT_OVERDUE"
  | "PAYMENT_DELETED"
  | "PAYMENT_RESTORED"
  | "PAYMENT_REFUNDED"
  | "PAYMENT_REFUND_IN_PROGRESS"
  | "PAYMENT_REFUND_DENIED"
  | "PAYMENT_RECEIVED_IN_CASH_UNDONE"
  | "PAYMENT_CHARGEBACK_REQUESTED"
  | "PAYMENT_CHARGEBACK_DISPUTE"
  | "PAYMENT_AWAITING_CHARGEBACK_REVERSAL"
  | "PAYMENT_DUNNING_RECEIVED"
  | "PAYMENT_DUNNING_REQUESTED"
  | "PAYMENT_BANK_SLIP_CANCELLED"
  | "PAYMENT_BANK_SLIP_VIEWED"
  | "PAYMENT_CHECKOUT_VIEWED"
  | "PAYMENT_CREDIT_CARD_CAPTURE_REFUSED"
  | "PAYMENT_PARTIALLY_REFUNDED"
  | "PAYMENT_SPLIT_CANCELLED"
  | "PAYMENT_SPLIT_DIVERGENCE_BLOCK"
  | "PAYMENT_SPLIT_DIVERGENCE_BLOCK_FINISHED"
  | "TRANSFER_CREATED"
  | "TRANSFER_PENDING"
  | "TRANSFER_IN_BANK_PROCESSING"
  | "TRANSFER_BLOCKED"
  | "TRANSFER_DONE"
  | "TRANSFER_FAILED"
  | "TRANSFER_CANCELLED"
  | "SUBSCRIPTION_CREATED"
  | "SUBSCRIPTION_UPDATED"
  | "SUBSCRIPTION_INACTIVATED"
  | "SUBSCRIPTION_DELETED";

export interface AsaasWebhook {
  id: string;
  name: string;
  url: string;
  email: string;
  enabled: boolean;
  interrupted: boolean;
  apiVersion: number;
  hasAuthToken?: boolean;
  sendType: AsaasWebhookSendType;
  penalizedRequestsCount?: number;
  events: AsaasWebhookEvent[];
}

export interface AsaasWebhookCreateRequest {
  name: string;
  url: string;
  email: string;
  enabled: boolean;
  interrupted: boolean;
  apiVersion: number;
  authToken: string;
  sendType: AsaasWebhookSendType;
  events: AsaasWebhookEvent[];
}
