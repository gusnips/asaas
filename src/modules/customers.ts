/**
 * Customer management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import { AsaasCustomer, AsaasApiPaginatedResponse, AsaasDeleteResponse } from "../types/index.ts";

export class CustomersModule {
  constructor(private client: AxiosInstance) { }

  /**
   * Create a customer
   * @param customerData The customer data
   * @returns The created customer
   */
  async create(customerData: Partial<AsaasCustomer>): Promise<AsaasCustomer> {
    const response = await this.client.post<AsaasCustomer>(
      "/customers",
      customerData
    );
    return response.data;
  }

  /**
   * Retrieve a customer
   * @param customerId The customer ID
   * @returns The customer
   */
  async retrieve(customerId: string): Promise<AsaasCustomer> {
    const response = await this.client.get<AsaasCustomer>(
      `/customers/${customerId}`
    );
    return response.data;
  }

  /**
   * Update a customer
   * @param customerId The customer ID
   * @param customerData The customer data
   * @returns The updated customer
   */
  async update(
    customerId: string,
    customerData: Partial<AsaasCustomer>
  ): Promise<AsaasCustomer> {
    const response = await this.client.post<AsaasCustomer>(
      `/customers/${customerId}`,
      customerData
    );
    return response.data;
  }

  /**
   * List customers
   * @param limit Maximum number of results
   * @param offset Pagination offset
   * @returns Array of customers
   */
  async list(
    limit: number = 100,
    offset: number = 0
  ): Promise<AsaasCustomer[]> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasCustomer>
    >("/customers", {
      params: { limit, offset },
    });
    return response.data.data || [];
  }

  /**
   * Delete a customer
   * @param customerId The customer ID
   * @returns The delete response
   */
  async delete(customerId: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/customers/${customerId}`
    );
    return response.data;
  }
}
