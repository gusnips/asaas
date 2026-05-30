/**
 * Payment Dunning module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasPaymentDunning,
  AsaasPaymentDunningCreateRequest,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class PaymentDunningsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a payment dunning
   * @param data The payment dunning data
   * @returns The created payment dunning
   */
  async create(
    data: AsaasPaymentDunningCreateRequest
  ): Promise<AsaasPaymentDunning> {
    const response = await this.client.post<AsaasPaymentDunning>(
      "/paymentDunnings",
      data
    );
    return response.data;
  }

  /**
   * Retrieve a payment dunning by ID
   * @param id The payment dunning ID
   * @returns The payment dunning
   */
  async retrieve(id: string): Promise<AsaasPaymentDunning> {
    const response = await this.client.get<AsaasPaymentDunning>(
      `/paymentDunnings/${id}`
    );
    return response.data;
  }

  /**
   * List payment dunnings
   * @param params Pagination parameters
   * @returns Paginated list of payment dunnings
   */
  async list(
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPaymentDunning>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPaymentDunning>
    >("/paymentDunnings", { params });
    return response.data;
  }

  /**
   * Simulate a payment dunning
   * @param data Simulation data
   * @returns Simulation result
   */
  async simulate(
    data: { payment: string; type: string }
  ): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/paymentDunnings/simulate",
      data
    );
    return response.data;
  }

  /**
   * Cancel a payment dunning
   * @param id The payment dunning ID
   * @returns The cancelled payment dunning
   */
  async cancel(id: string): Promise<AsaasPaymentDunning> {
    const response = await this.client.post<AsaasPaymentDunning>(
      `/paymentDunnings/${id}/cancel`
    );
    return response.data;
  }

  /**
   * Get event history for a payment dunning
   * @param id The payment dunning ID
   * @returns Event history
   */
  async getHistory(id: string): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      `/paymentDunnings/${id}/history`
    );
    return response.data;
  }

  /**
   * List payments available for dunning
   * @param params Pagination parameters
   * @returns Available payments
   */
  async listAvailablePayments(
    params: { offset?: number; limit?: number } = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      "/paymentDunnings/paymentsAvailableForDunning",
      { params }
    );
    return response.data;
  }
}
