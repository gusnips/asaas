/**
 * Notification types for Asaas SDK
 */

export interface AsaasNotification {
  id: string;
  customer: string;
  enabled: boolean;
  emailEnabledForProvider: boolean;
  smsEnabledForProvider: boolean;
  emailEnabledForCustomer: boolean;
  smsEnabledForCustomer: boolean;
  phoneCallEnabledForCustomer: boolean;
  whatsappEnabledForCustomer: boolean;
  scheduleOffset?: number;
  event?: string;
}

export interface AsaasNotificationUpdateRequest {
  enabled?: boolean;
  emailEnabledForProvider?: boolean;
  smsEnabledForProvider?: boolean;
  emailEnabledForCustomer?: boolean;
  smsEnabledForCustomer?: boolean;
  phoneCallEnabledForCustomer?: boolean;
  whatsappEnabledForCustomer?: boolean;
  scheduleOffset?: number;
}
