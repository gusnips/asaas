/**
 * Subscription management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasSubscription,
  AsaasSubscriptionRequest,
  AsaasSubscriptionStatus,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

/**
 * Calculate next due date for subscription reactivation
 */
function calculateNextDueDateForReactivation(cycle: string): string {
  const today = new Date();
  const nextDate = new Date(today);

  switch (cycle) {
    case "WEEKLY":
      nextDate.setDate(today.getDate() + 7);
      break;
    case "BIWEEKLY":
      nextDate.setDate(today.getDate() + 14);
      break;
    case "MONTHLY":
      nextDate.setMonth(today.getMonth() + 1);
      break;
    case "BIMONTHLY":
      nextDate.setMonth(today.getMonth() + 2);
      break;
    case "QUARTERLY":
      nextDate.setMonth(today.getMonth() + 3);
      break;
    case "SEMIANNUALLY":
      nextDate.setMonth(today.getMonth() + 6);
      break;
    case "YEARLY":
      nextDate.setFullYear(today.getFullYear() + 1);
      break;
    default:
      nextDate.setMonth(today.getMonth() + 1);
  }

  return nextDate.toISOString().split("T")[0] || "";
}

export class SubscriptionsModule {
  constructor(private client: AxiosInstance) { }

  /**
   * Retrieve a subscription
   * @param subscriptionId The subscription ID
   * @returns The subscription
   */
  async retrieve(subscriptionId: string): Promise<AsaasSubscription> {
    const response = await this.client.get<AsaasSubscription>(
      `/subscriptions/${subscriptionId}`
    );
    return response.data;
  }

  /**
   * List subscriptions for a customer
   * @param customerId The customer ID (optional)
   * @param status The status of the subscriptions
   * @returns Array of subscriptions
   */
  async list(
    customerId?: string,
    status?: AsaasSubscriptionStatus
  ): Promise<AsaasSubscription[]> {
    const params: Record<string, string> = {};
    if (customerId) {
      params.customer = customerId;
    }
    if (status) {
      params.status = status;
    }

    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasSubscription>
    >("/subscriptions", { params });
    return response.data.data || [];
  }

  /**
   * Create a subscription
   * @param subscriptionData The subscription data
   * @returns The created subscription
   */
  async create(
    subscriptionData: Partial<AsaasSubscription>
  ): Promise<AsaasSubscription> {
    const response = await this.client.post<AsaasSubscription>(
      "/subscriptions",
      subscriptionData
    );
    return response.data;
  }

  /**
   * Update a subscription
   * @param subscriptionId The subscription ID
   * @param subscriptionData The subscription data
   * @returns The updated subscription
   */
  async update(
    subscriptionId: string,
    subscriptionData: Partial<AsaasSubscriptionRequest>
  ): Promise<AsaasSubscription> {
    const response = await this.client.post<AsaasSubscription>(
      `/subscriptions/${subscriptionId}`,
      subscriptionData
    );
    return response.data;
  }

  /**
   * Reactivate a subscription
   * @param subscriptionId The subscription ID
   * @param subscriptionData The subscription data
   * @returns The reactivated subscription
   */
  async reactivate(
    subscriptionId: string,
    subscriptionData?: Partial<AsaasSubscriptionRequest>
  ): Promise<AsaasSubscription> {
    // First get the subscription to determine its cycle
    const subscription = await this.retrieve(subscriptionId);
    const nextDueDate = calculateNextDueDateForReactivation(subscription.cycle);

    // In Asaas API, reactivation is done by updating status to ACTIVE with nextDueDate
    const response = await this.client.post<AsaasSubscription>(
      `/subscriptions/${subscriptionId}`,
      {
        status: AsaasSubscriptionStatus.ACTIVE,
        nextDueDate,
        ...(subscriptionData || {}),
      }
    );
    return response.data;
  }

  /**
   * Cancel a subscription
   * @param subscriptionId The subscription ID
   * @returns The canceled subscription
   */
  async cancel(subscriptionId: string): Promise<AsaasSubscription> {
    // In Asaas API, cancellation is done by updating status to INACTIVE
    const response = await this.client.post<AsaasSubscription>(
      `/subscriptions/${subscriptionId}`,
      {
        status: AsaasSubscriptionStatus.INACTIVE,
      }
    );
    return response.data;
  }

  /**
   * Delete a subscription
   * @param subscriptionId The subscription ID
   * @returns The delete response
   */
  async delete(subscriptionId: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/subscriptions/${subscriptionId}`
    );
    return response.data;
  }
}
