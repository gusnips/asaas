/**
 * Subscription-related types for Asaas SDK
 */

import { AsaasBillingType, AsaasDiscountType } from "./common.ts";

/**
 * Subscription Cycles for Asaas
 */
export enum AsaasSubscriptionCycle {
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  BIMONTHLY = "BIMONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMIANNUALLY = "SEMIANNUALLY",
  YEARLY = "YEARLY",
}

/**
 * Subscription Status for Asaas
 */
export enum AsaasSubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

/**
 * Split status for Asaas
 */
export enum AsaasSplitStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

/**
 * Split disabled reason for Asaas
 */
export enum AsaasSplitDisabledReason {
  WALLET_UNABLE_TO_RECEIVE = "WALLET_UNABLE_TO_RECEIVE",
  VALUE_DIVERGENCE = "VALUE_DIVERGENCE",
}

/**
 * Split configuration for subscriptions
 */
export interface AsaasSplit {
  id: string;
  walletId: string;
  fixedValue?: number;
  percentualValue?: number;
  externalReference?: string;
  description?: string;
  status: AsaasSplitStatus;
  disabledReason?: AsaasSplitDisabledReason;
}

/**
 * Credit card object for subscriptions
 */
export interface AsaasCreditCardObject {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

/**
 * Credit card holder info
 */
export interface AsaasCreditCardHolderInfo {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  addressComplement?: string;
  phone?: string;
  mobilePhone?: string;
}

/**
 * Subscription response structure
 */
export interface AsaasSubscription {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink?: string;
  billingType: AsaasBillingType;
  cycle: AsaasSubscriptionCycle;
  value: number;
  nextDueDate: string;
  endDate?: string;
  description?: string;
  status: AsaasSubscriptionStatus;
  discount?: {
    value: number;
    dueDateLimitDays: number;
    type: AsaasDiscountType;
  };
  fine?: {
    value: number;
  };
  interest?: {
    value: number;
  };
  deleted?: boolean;
  maxPayments?: number;
  externalReference?: string;
  split?: AsaasSplit[];
  callback?: {
    successUrl: string;
    autoRedirect?: boolean;
  };
}

/**
 * Request interface - what we send to create/update a subscription
 */
export interface AsaasSubscriptionRequest
  extends Omit<AsaasSubscription, "object" | "id" | "dateCreated" | "deleted"> {
  updatePendingPayments?: boolean;
  creditCardToken?: string;
  creditCard?: AsaasCreditCardObject;
  creditCardHolderInfo?: AsaasCreditCardHolderInfo;
}

/**
 * Request interface - what we send to update a subscription
 */
export interface AsaasSubscriptionUpdateRequest
  extends Partial<
    Omit<AsaasSubscription, "object" | "id" | "dateCreated" | "deleted">
  > {
  updatePendingPayments?: boolean;
  creditCardToken?: string;
  creditCard?: AsaasCreditCardObject;
  creditCardHolderInfo?: AsaasCreditCardHolderInfo;
}
