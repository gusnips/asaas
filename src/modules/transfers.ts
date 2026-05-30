/**
 * Transfer management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasTransfer,
  AsaasTransferCreateRequest,
  AsaasTransferToAsaasRequest,
  AsaasListTransfersParams,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class TransfersModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Transfer to another institution's account or Pix key
   * @param data The transfer data
   * @returns The created transfer
   */
  async create(data: AsaasTransferCreateRequest): Promise<AsaasTransfer> {
    const response = await this.client.post<AsaasTransfer>(
      "/transfers",
      data
    );
    return response.data;
  }

  /**
   * Transfer to an Asaas account (internal)
   * @param data The transfer data (value + walletId)
   * @returns The created transfer
   */
  async transferToAsaas(
    data: AsaasTransferToAsaasRequest
  ): Promise<AsaasTransfer> {
    const response = await this.client.post<AsaasTransfer>(
      "/transfers/",
      data
    );
    return response.data;
  }

  /**
   * Retrieve a transfer by ID
   * @param id The transfer ID
   * @returns The transfer
   */
  async retrieve(id: string): Promise<AsaasTransfer> {
    const response = await this.client.get<AsaasTransfer>(
      `/transfers/${id}`
    );
    return response.data;
  }

  /**
   * List transfers with optional filters
   * @param params Filter parameters
   * @returns Paginated list of transfers
   */
  async list(
    params: AsaasListTransfersParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasTransfer>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasTransfer>
    >("/transfers", { params });
    return response.data;
  }

  /**
   * Cancel a transfer
   * @param id The transfer ID
   */
  async cancel(id: string): Promise<void> {
    await this.client.delete(`/transfers/${id}/cancel`);
  }
}
