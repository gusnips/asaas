/**
 * PIX module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasPixTransaction,
  AsaasPixAddressKey,
  AsaasPixQrCodeCreateRequest,
  AsaasListPixTransactionsParams,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class PixModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a Pix address key
   * @param type The key type (CPF, CNPJ, EMAIL, PHONE, EVP)
   * @returns The created key
   */
  async createKey(type: string): Promise<AsaasPixAddressKey> {
    const response = await this.client.post<AsaasPixAddressKey>(
      "/pix/addressKeys",
      { type }
    );
    return response.data;
  }

  /**
   * List Pix address keys
   * @param params Pagination parameters
   * @returns Paginated list of keys
   */
  async listKeys(
    params: { offset?: number; limit?: number } = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPixAddressKey>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPixAddressKey>
    >("/pix/addressKeys", { params });
    return response.data;
  }

  /**
   * Retrieve a Pix address key by ID
   * @param id The key ID
   * @returns The key
   */
  async retrieveKey(id: string): Promise<AsaasPixAddressKey> {
    const response = await this.client.get<AsaasPixAddressKey>(
      `/pix/addressKeys/${id}`
    );
    return response.data;
  }

  /**
   * Delete a Pix address key
   * @param id The key ID
   */
  async deleteKey(id: string): Promise<void> {
    await this.client.delete(`/pix/addressKeys/${id}`);
  }

  /**
   * Create a static QR Code
   * @param data QR code creation data
   * @returns The created QR code
   */
  async createStaticQrCode(
    data: AsaasPixQrCodeCreateRequest
  ): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/pix/qrCodes/static",
      data
    );
    return response.data;
  }

  /**
   * Delete a static QR Code
   * @param id The QR code ID
   */
  async deleteStaticQrCode(id: string): Promise<void> {
    await this.client.delete(`/pix/qrCodes/static/${id}`);
  }

  /**
   * Decode a QR Code for payment
   * @param payload The QR code payload
   * @returns Decoded QR code data
   */
  async decodeQrCode(payload: string): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/pix/qrCodes/decode",
      { payload }
    );
    return response.data;
  }

  /**
   * Pay a QR Code
   * @param data Payment data
   * @returns The transaction
   */
  async payQrCode(
    data: Record<string, unknown>
  ): Promise<AsaasPixTransaction> {
    const response = await this.client.post<AsaasPixTransaction>(
      "/pix/qrCodes/pay",
      data
    );
    return response.data;
  }

  /**
   * Retrieve a Pix transaction by ID
   * @param id The transaction ID
   * @returns The transaction
   */
  async retrieveTransaction(id: string): Promise<AsaasPixTransaction> {
    const response = await this.client.get<AsaasPixTransaction>(
      `/pix/transactions/${id}`
    );
    return response.data;
  }

  /**
   * List Pix transactions
   * @param params Filter and pagination parameters
   * @returns Paginated list of transactions
   */
  async listTransactions(
    params: AsaasListPixTransactionsParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPixTransaction>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPixTransaction>
    >("/pix/transactions", { params });
    return response.data;
  }

  /**
   * Cancel a scheduled Pix transaction
   * @param id The transaction ID
   * @returns The cancelled transaction
   */
  async cancelTransaction(id: string): Promise<AsaasPixTransaction> {
    const response = await this.client.post<AsaasPixTransaction>(
      `/pix/transactions/${id}/cancel`
    );
    return response.data;
  }
}
