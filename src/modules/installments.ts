/**
 * Installment management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasInstallment,
  AsaasInstallmentCreateRequest,
  AsaasPayment,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

export class InstallmentsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create an installment
   * @param data The installment data
   * @returns The created installment
   */
  async create(data: AsaasInstallmentCreateRequest): Promise<AsaasInstallment> {
    const response = await this.client.post<AsaasInstallment>(
      "/installments",
      data
    );
    return response.data;
  }

  /**
   * Retrieve an installment by ID
   * @param id The installment ID
   * @returns The installment
   */
  async retrieve(id: string): Promise<AsaasInstallment> {
    const response = await this.client.get<AsaasInstallment>(
      `/installments/${id}`
    );
    return response.data;
  }

  /**
   * List installments
   * @param params Pagination parameters
   * @returns Paginated list of installments
   */
  async list(
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasInstallment>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasInstallment>
    >("/installments", { params });
    return response.data;
  }

  /**
   * Delete (remove) an installment
   * @param id The installment ID
   * @returns The delete response
   */
  async delete(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/installments/${id}`
    );
    return response.data;
  }

  /**
   * List payments of an installment
   * @param id The installment ID
   * @param params Pagination parameters
   * @returns Paginated list of payments
   */
  async listPayments(
    id: string,
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPayment>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPayment>
    >(`/installments/${id}/payments`, { params });
    return response.data;
  }

  /**
   * Cancel pending/overdue charges of an installment
   * @param id The installment ID
   * @returns The delete response
   */
  async cancelPayments(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/installments/${id}/payments`
    );
    return response.data;
  }

  /**
   * Refund an installment
   * @param id The installment ID
   * @returns The refunded installment
   */
  async refund(id: string): Promise<AsaasInstallment> {
    const response = await this.client.post<AsaasInstallment>(
      `/installments/${id}/refund`
    );
    return response.data;
  }

  /**
   * Generate installment payment booklet
   * @param id The installment ID
   * @returns The booklet data
   */
  async getPaymentBook(id: string): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      `/installments/${id}/paymentBook`
    );
    return response.data;
  }
}
