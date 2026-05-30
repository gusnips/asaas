/**
 * Payment Link types for Asaas SDK
 */

export enum AsaasChargeType {
  DETACHED = "DETACHED",
  RECURRENT = "RECURRENT",
  INSTALLMENT = "INSTALLMENT",
}

export interface AsaasPaymentLink {
  id: string;
  name: string;
  value?: number;
  active: boolean;
  chargeType: AsaasChargeType;
  url: string;
  billingType: string;
  subscriptionCycle?: string;
  description?: string;
  endDate?: string;
  deleted?: boolean;
  viewCount?: number;
  maxInstallmentCount?: number;
  dueDateLimitDays?: number;
  notificationEnabled?: boolean;
  isAddressRequired?: boolean;
  externalReference?: string;
}

export interface AsaasPaymentLinkCreateRequest {
  name: string;
  billingType: string;
  chargeType: AsaasChargeType;
  description?: string;
  endDate?: string;
  value?: number;
  dueDateLimitDays?: number;
  subscriptionCycle?: string;
  maxInstallmentCount?: number;
  externalReference?: string;
  notificationEnabled?: boolean;
  callback?: {
    successUrl: string;
    autoRedirect?: boolean;
  };
  isAddressRequired?: boolean;
}

export interface AsaasListPaymentLinksParams {
  offset?: number;
  limit?: number;
  active?: boolean;
  includeDeleted?: boolean;
  name?: string;
  externalReference?: string;
}
