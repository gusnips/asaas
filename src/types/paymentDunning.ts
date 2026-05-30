/**
 * Payment Dunning types for Asaas SDK
 */

export enum AsaasPaymentDunningStatus {
  PENDING = "PENDING",
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
  AWAITING_CANCELLATION = "AWAITING_CANCELLATION",
  PROCESSED = "PROCESSED",
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  DENIED = "DENIED",
  CANCELLED = "CANCELLED",
}

export enum AsaasPaymentDunningType {
  CREDIT_BUREAU = "CREDIT_BUREAU",
}

export interface AsaasPaymentDunning {
  id: string;
  dunningNumber?: number;
  status: AsaasPaymentDunningStatus;
  type: AsaasPaymentDunningType;
  requestDate?: string;
  description?: string;
  value?: number;
  feeValue?: number;
  netValue?: number;
  receivedInCashFeeValue?: number;
  denialReason?: string;
  canBeCancelled?: boolean;
  cannotBeCancelledReason?: string;
  isNecessaryResendDocumentation?: boolean;
  payment: string;
}

export interface AsaasPaymentDunningCreateRequest {
  payment: string;
  type: AsaasPaymentDunningType;
  description?: string;
  customerName: string;
  customerCpfCnpj: string;
  customerPrimaryPhone: string;
  customerSecondaryPhone?: string;
  customerPostalCode: string;
  customerAddress: string;
  customerAddressNumber: string;
  customerComplement?: string;
  customerProvince: string;
}
