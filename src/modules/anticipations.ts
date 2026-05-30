/**
 * Anticipation module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasAnticipation,
  AsaasAnticipationCreateRequest,
  AsaasListAnticipationsParams,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class AnticipationsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Request an anticipation
   * @param data The anticipation request data
   * @returns The created anticipation
   */
  async create(data: AsaasAnticipationCreateRequest): Promise<AsaasAnticipation> {
    const response = await this.client.post<AsaasAnticipation>(
      "/anticipations",
      data
    );
    return response.data;
  }

  /**
   * Retrieve an anticipation by ID
   * @param id The anticipation ID
   * @returns The anticipation
   */
  async retrieve(id: string): Promise<AsaasAnticipation> {
    const response = await this.client.get<AsaasAnticipation>(
      `/anticipations/${id}`
    );
    return response.data;
  }

  /**
   * List anticipations with optional filters
   * @param params Filter and pagination parameters
   * @returns Paginated list of anticipations
   */
  async list(
    params: AsaasListAnticipationsParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasAnticipation>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasAnticipation>
    >("/anticipations", { params });
    return response.data;
  }

  /**
   * Simulate an anticipation
   * @param data Simulation parameters
   * @returns Simulation result
   */
  async simulate(
    data: AsaasAnticipationCreateRequest
  ): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/anticipations/simulate",
      data
    );
    return response.data;
  }

  /**
   * Cancel an anticipation
   * @param id The anticipation ID
   * @returns The cancelled anticipation
   */
  async cancel(id: string): Promise<AsaasAnticipation> {
    const response = await this.client.post<AsaasAnticipation>(
      `/anticipations/${id}/cancel`
    );
    return response.data;
  }

  /**
   * Retrieve anticipation limits
   * @returns Anticipation limits
   */
  async getLimits(): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      "/anticipations/limits"
    );
    return response.data;
  }
}
