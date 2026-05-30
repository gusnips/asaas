/**
 * Webhook management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasWebhook,
  AsaasWebhookCreateRequest,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

export class WebhooksModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a webhook
   * @param data The webhook data
   * @returns The created webhook
   */
  async create(data: AsaasWebhookCreateRequest): Promise<AsaasWebhook> {
    const response = await this.client.post<AsaasWebhook>("/webhooks", data);
    return response.data;
  }

  /**
   * Retrieve a webhook by ID
   * @param id The webhook ID
   * @returns The webhook
   */
  async retrieve(id: string): Promise<AsaasWebhook> {
    const response = await this.client.get<AsaasWebhook>(`/webhooks/${id}`);
    return response.data;
  }

  /**
   * Update a webhook
   * @param id The webhook ID
   * @param data The webhook data to update
   * @returns The updated webhook
   */
  async update(
    id: string,
    data: Partial<AsaasWebhookCreateRequest>
  ): Promise<AsaasWebhook> {
    const response = await this.client.put<AsaasWebhook>(
      `/webhooks/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete a webhook
   * @param id The webhook ID
   * @returns The delete response
   */
  async delete(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/webhooks/${id}`
    );
    return response.data;
  }

  /**
   * List webhooks
   * @param params Pagination parameters
   * @returns Paginated list of webhooks
   */
  async list(
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasWebhook>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasWebhook>
    >("/webhooks", { params });
    return response.data;
  }

  /**
   * Remove webhook backoff (resume sending)
   * @param id The webhook ID
   */
  async removeBackoff(id: string): Promise<void> {
    await this.client.post(`/webhooks/${id}/removeBackoff`);
  }
}
