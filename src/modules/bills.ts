/**
 * Bill payment module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasBill,
  AsaasBillCreateRequest,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class BillsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a bill payment
   * @param data The bill payment data
   * @returns The created bill payment
   */
  async create(data: AsaasBillCreateRequest): Promise<AsaasBill> {
    const response = await this.client.post<AsaasBill>("/bill", data);
    return response.data;
  }

  /**
   * Retrieve a bill payment by ID
   * @param id The bill payment ID
   * @returns The bill payment
   */
  async retrieve(id: string): Promise<AsaasBill> {
    const response = await this.client.get<AsaasBill>(`/bill/${id}`);
    return response.data;
  }

  /**
   * List bill payments
   * @param params Pagination parameters
   * @returns Paginated list of bill payments
   */
  async list(
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasBill>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasBill>
    >("/bill", { params });
    return response.data;
  }

  /**
   * Simulate a bill payment
   * @param data Simulation data
   * @returns Simulation result
   */
  async simulate(
    data: { identificationField: string }
  ): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/bill/simulate",
      data
    );
    return response.data;
  }

  /**
   * Cancel a bill payment
   * @param id The bill payment ID
   * @returns The cancelled bill
   */
  async cancel(id: string): Promise<AsaasBill> {
    const response = await this.client.post<AsaasBill>(`/bill/${id}/cancel`);
    return response.data;
  }
}
