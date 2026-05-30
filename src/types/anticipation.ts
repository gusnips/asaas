/**
 * Anticipation types for Asaas SDK
 */

export enum AsaasAnticipationStatus {
  PENDING = "PENDING",
  DENIED = "DENIED",
  CREDITED = "CREDITED",
  DEBITED = "DEBITED",
  CANCELLED = "CANCELLED",
  OVERDUE = "OVERDUE",
  SCHEDULED = "SCHEDULED",
}

export interface AsaasAnticipation {
  object?: string;
  id: string;
  installment?: string;
  payment?: string;
  status: AsaasAnticipationStatus;
  anticipationDate?: string;
  dueDate?: string;
  requestDate?: string;
  fee?: number;
  anticipationDays?: number;
  netValue?: number;
  totalValue?: number;
  value?: number;
  denialObservation?: string;
}

export interface AsaasAnticipationCreateRequest {
  payment?: string;
  installment?: string;
}

export interface AsaasAnticipationSimulateRequest {
  payment?: string;
  installment?: string;
}

export interface AsaasListAnticipationsParams {
  offset?: number;
  limit?: number;
  payment?: string;
  installment?: string;
  status?: AsaasAnticipationStatus;
}
