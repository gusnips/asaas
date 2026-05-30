/**
 * Customer management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasCustomer,
  AsaasCustomerCreateRequest,
  AsaasListCustomersParams,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

export class CustomersModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a customer
   * @param data The customer data
   * @returns The created customer
   */
  async create(data: AsaasCustomerCreateRequest): Promise<AsaasCustomer> {
    const response = await this.client.post<AsaasCustomer>("/customers", data);
    return response.data;
  }

  /**
   * Retrieve a customer by ID
   * @param id The customer ID
   * @returns The customer
   */
  async retrieve(id: string): Promise<AsaasCustomer> {
    const response = await this.client.get<AsaasCustomer>(`/customers/${id}`);
    return response.data;
  }

  /**
   * Update a customer
   * @param id The customer ID
   * @param data The customer data to update
   * @returns The updated customer
   */
  async update(
    id: string,
    data: Partial<AsaasCustomerCreateRequest>
  ): Promise<AsaasCustomer> {
    const response = await this.client.put<AsaasCustomer>(
      `/customers/${id}`,
      data
    );
    return response.data;
  }

  /**
   * List customers with optional filters
   * @param params Filter and pagination parameters
   * @returns Paginated list of customers
   */
  async list(
    params: AsaasListCustomersParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasCustomer>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasCustomer>
    >("/customers", { params });
    return response.data;
  }

  /**
   * Delete (remove) a customer
   * @param id The customer ID
   * @returns The delete response
   */
  async delete(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/customers/${id}`
    );
    return response.data;
  }

  /**
   * Restore a removed customer
   * @param id The customer ID
   * @returns The restored customer
   */
  async restore(id: string): Promise<AsaasCustomer> {
    const response = await this.client.post<AsaasCustomer>(
      `/customers/${id}/restore`
    );
    return response.data;
  }
}
