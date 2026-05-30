/**
 * Mobile Phone Recharge types for Asaas SDK
 */

export enum AsaasMobilePhoneRechargeStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  WAITING_CRITICAL_ACTION = "WAITING_CRITICAL_ACTION",
}

export interface AsaasMobilePhoneRecharge {
  id: string;
  value: number;
  phoneNumber: string;
  status: AsaasMobilePhoneRechargeStatus;
  canBeCancelled?: boolean;
  operatorName?: string;
}

export interface AsaasMobilePhoneRechargeCreateRequest {
  value: number;
  phoneNumber: string;
}
