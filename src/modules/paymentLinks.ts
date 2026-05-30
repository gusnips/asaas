/**
 * Payment Links module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasPaymentLink,
  AsaasPaymentLinkCreateRequest,
  AsaasListPaymentLinksParams,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

export class PaymentLinksModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a payment link
   * @param data The payment link data
   * @returns The created payment link
   */
  async create(data: AsaasPaymentLinkCreateRequest): Promise<AsaasPaymentLink> {
    const response = await this.client.post<AsaasPaymentLink>(
      "/paymentLinks",
      data
    );
    return response.data;
  }

  /**
   * Retrieve a payment link by ID
   * @param id The payment link ID
   * @returns The payment link
   */
  async retrieve(id: string): Promise<AsaasPaymentLink> {
    const response = await this.client.get<AsaasPaymentLink>(
      `/paymentLinks/${id}`
    );
    return response.data;
  }

  /**
   * Update a payment link
   * @param id The payment link ID
   * @param data The payment link data to update
   * @returns The updated payment link
   */
  async update(
    id: string,
    data: Partial<AsaasPaymentLinkCreateRequest>
  ): Promise<AsaasPaymentLink> {
    const response = await this.client.put<AsaasPaymentLink>(
      `/paymentLinks/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete (remove) a payment link
   * @param id The payment link ID
   * @returns The delete response
   */
  async delete(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/paymentLinks/${id}`
    );
    return response.data;
  }

  /**
   * Restore a removed payment link
   * @param id The payment link ID
   * @returns The restored payment link
   */
  async restore(id: string): Promise<AsaasPaymentLink> {
    const response = await this.client.post<AsaasPaymentLink>(
      `/paymentLinks/${id}/restore`
    );
    return response.data;
  }

  /**
   * List payment links with optional filters
   * @param params Filter and pagination parameters
   * @returns Paginated list of payment links
   */
  async list(
    params: AsaasListPaymentLinksParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPaymentLink>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPaymentLink>
    >("/paymentLinks", { params });
    return response.data;
  }
}
