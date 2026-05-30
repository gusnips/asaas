/**
 * Mobile Phone Recharge module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasMobilePhoneRecharge,
  AsaasMobilePhoneRechargeCreateRequest,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class MobilePhoneRechargesModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Request a mobile phone recharge
   * @param data The recharge data
   * @returns The created recharge
   */
  async create(
    data: AsaasMobilePhoneRechargeCreateRequest
  ): Promise<AsaasMobilePhoneRecharge> {
    const response = await this.client.post<AsaasMobilePhoneRecharge>(
      "/mobilePhoneRecharges",
      data
    );
    return response.data;
  }

  /**
   * Retrieve a recharge by ID
   * @param id The recharge ID
   * @returns The recharge
   */
  async retrieve(id: string): Promise<AsaasMobilePhoneRecharge> {
    const response = await this.client.get<AsaasMobilePhoneRecharge>(
      `/mobilePhoneRecharges/${id}`
    );
    return response.data;
  }

  /**
   * List mobile phone recharges
   * @param params Pagination parameters
   * @returns Paginated list of recharges
   */
  async list(
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasMobilePhoneRecharge>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasMobilePhoneRecharge>
    >("/mobilePhoneRecharges", { params });
    return response.data;
  }

  /**
   * Cancel a recharge
   * @param id The recharge ID
   * @returns The cancelled recharge
   */
  async cancel(id: string): Promise<AsaasMobilePhoneRecharge> {
    const response = await this.client.post<AsaasMobilePhoneRecharge>(
      `/mobilePhoneRecharges/${id}/cancel`
    );
    return response.data;
  }

  /**
   * Search for cell phone provider
   * @param phoneNumber The phone number
   * @returns Provider information
   */
  async getProvider(phoneNumber: string): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      `/mobilePhoneRecharges/${phoneNumber}/provider`
    );
    return response.data;
  }
}
