/**
 * Subscription management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasPayment,
  AsaasSubscription,
  AsaasSubscriptionRequest,
  AsaasSubscriptionUpdateRequest,
  AsaasListSubscriptionsParams,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

export class SubscriptionsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a subscription
   * @param data The subscription data
   * @returns The created subscription
   */
  async create(
    data: Partial<AsaasSubscriptionRequest>
  ): Promise<AsaasSubscription> {
    const response = await this.client.post<AsaasSubscription>(
      "/subscriptions",
      data
    );
    return response.data;
  }

  /**
   * Retrieve a subscription by ID
   * @param id The subscription ID
   * @returns The subscription
   */
  async retrieve(id: string): Promise<AsaasSubscription> {
    const response = await this.client.get<AsaasSubscription>(
      `/subscriptions/${id}`
    );
    return response.data;
  }

  /**
   * Update a subscription
   * @param id The subscription ID
   * @param data The subscription data to update
   * @returns The updated subscription
   */
  async update(
    id: string,
    data: Partial<AsaasSubscriptionUpdateRequest>
  ): Promise<AsaasSubscription> {
    const response = await this.client.put<AsaasSubscription>(
      `/subscriptions/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete (remove) a subscription
   * @param id The subscription ID
   * @returns The delete response
   */
  async delete(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/subscriptions/${id}`
    );
    return response.data;
  }

  /**
   * List subscriptions with optional filters
   * @param params Filter and pagination parameters
   * @returns Paginated list of subscriptions
   */
  async list(
    params: AsaasListSubscriptionsParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasSubscription>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasSubscription>
    >("/subscriptions", { params });
    return response.data;
  }

  /**
   * List payments of a subscription
   * @param id The subscription ID
   * @param params Pagination parameters
   * @returns Paginated list of payments
   */
  async listPayments(
    id: string,
    params: { offset?: number; limit?: number; status?: string } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPayment>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPayment>
    >(`/subscriptions/${id}/payments`, { params });
    return response.data;
  }

  /**
   * Update the credit card for a subscription without charging
   * @param id The subscription ID
   * @param creditCardData Credit card data
   * @returns The updated subscription
   */
  async updateCreditCard(
    id: string,
    creditCardData: Record<string, unknown>
  ): Promise<AsaasSubscription> {
    const response = await this.client.put<AsaasSubscription>(
      `/subscriptions/${id}/creditCard`,
      creditCardData
    );
    return response.data;
  }

  /**
   * Generate subscription payment booklet
   * @param id The subscription ID
   * @returns The booklet URL or data
   */
  async getPaymentBook(id: string): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      `/subscriptions/${id}/paymentBook`
    );
    return response.data;
  }
}
