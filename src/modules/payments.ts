/**
 * Payment management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasPayment,
  AsaasPaymentCreateRequest,
  AsaasPaymentBillingInfo,
  AsaasBoletoInfo,
  AsaasPixQrCode,
  AsaasCreditCardToken,
  AsaasCreditCardTokenizationRequest,
  AsaasListPaymentsOptions,
  AsaasApiPaginatedResponse,
  AsaasDeleteResponse,
} from "../types/index.ts";

export class PaymentsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a payment
   * @param data The payment data
   * @returns The created payment
   */
  async create(data: AsaasPaymentCreateRequest): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>("/payments", data);
    return response.data;
  }

  /**
   * Retrieve a payment by ID
   * @param id The payment ID
   * @returns The payment
   */
  async retrieve(id: string): Promise<AsaasPayment> {
    const response = await this.client.get<AsaasPayment>(`/payments/${id}`);
    return response.data;
  }

  /**
   * Update a payment
   * @param id The payment ID
   * @param data The payment data to update
   * @returns The updated payment
   */
  async update(
    id: string,
    data: Partial<AsaasPaymentCreateRequest>
  ): Promise<AsaasPayment> {
    const response = await this.client.put<AsaasPayment>(
      `/payments/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete a payment
   * @param id The payment ID
   * @returns The delete response
   */
  async delete(id: string): Promise<AsaasDeleteResponse> {
    const response = await this.client.delete<AsaasDeleteResponse>(
      `/payments/${id}`
    );
    return response.data;
  }

  /**
   * Restore a removed payment
   * @param id The payment ID
   * @returns The restored payment
   */
  async restore(id: string): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${id}/restore`
    );
    return response.data;
  }

  /**
   * List payments with optional filters
   * @param params Filter and pagination parameters
   * @returns Paginated list of payments
   */
  async list(
    params: AsaasListPaymentsOptions = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasPayment>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPayment>
    >("/payments", { params });
    return response.data;
  }

  /**
   * Get the status of a payment
   * @param id The payment ID
   * @returns The payment status
   */
  async getStatus(id: string): Promise<{ status: string }> {
    const response = await this.client.get<{ status: string }>(
      `/payments/${id}/status`
    );
    return response.data;
  }

  /**
   * Refund a payment
   * @param id The payment ID
   * @param value Optional partial refund value
   * @param description Optional refund description
   * @returns The refunded payment
   */
  async refund(
    id: string,
    value?: number,
    description?: string
  ): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${id}/refund`,
      { value, description }
    );
    return response.data;
  }

  /**
   * Capture a pre-authorized payment
   * @param id The payment ID
   * @returns The captured payment
   */
  async capturePreAuthorized(id: string): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${id}/captureAuthorizedPayment`
    );
    return response.data;
  }

  /**
   * Pay a charge with a credit card
   * @param id The payment ID
   * @param creditCardData Credit card or token data
   * @returns The payment
   */
  async payWithCreditCard(
    id: string,
    creditCardData: Record<string, unknown>
  ): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${id}/payWithCreditCard`,
      creditCardData
    );
    return response.data;
  }

  /**
   * Confirm cash receipt for a payment
   * @param id The payment ID
   * @param paymentDate The date payment was received
   * @param value The value received
   * @returns The payment
   */
  async receiveInCash(
    id: string,
    paymentDate: string,
    value: number
  ): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${id}/receiveInCash`,
      { paymentDate, value }
    );
    return response.data;
  }

  /**
   * Undo cash receipt confirmation
   * @param id The payment ID
   * @returns The payment
   */
  async undoReceivedInCash(id: string): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${id}/undoReceivedInCash`
    );
    return response.data;
  }

  /**
   * Get billing info for a payment
   * @param id The payment ID
   * @returns The billing info
   */
  async getBillingInfo(id: string): Promise<AsaasPaymentBillingInfo> {
    const response = await this.client.get<AsaasPaymentBillingInfo>(
      `/payments/${id}/billingInfo`
    );
    return response.data;
  }

  /**
   * Get the digitable bill line (boleto)
   * @param id The payment ID
   * @returns The boleto info
   */
  async getIdentificationField(id: string): Promise<AsaasBoletoInfo> {
    const response = await this.client.get<AsaasBoletoInfo>(
      `/payments/${id}/identificationField`
    );
    return response.data;
  }

  /**
   * Get PIX QR code for a payment
   * @param id The payment ID
   * @returns The PIX QR code
   */
  async getPixQrCode(id: string): Promise<AsaasPixQrCode> {
    const response = await this.client.get<AsaasPixQrCode>(
      `/payments/${id}/pixQrCode`
    );
    return response.data;
  }

  /**
   * Tokenize a credit card
   * @param data The credit card data
   * @returns The credit card token
   */
  async tokenizeCreditCard(
    data: AsaasCreditCardTokenizationRequest
  ): Promise<AsaasCreditCardToken> {
    const response = await this.client.post<AsaasCreditCardToken>(
      "/creditCard/tokenizeCreditCard",
      data
    );
    return response.data;
  }

  /**
   * Simulate a payment
   * @param data Simulation parameters
   * @returns Simulation result
   */
  async simulate(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/payments/simulate",
      data
    );
    return response.data;
  }

  /**
   * Get payment limits
   * @returns Payment limits
   */
  async getLimits(): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      "/payments/limits"
    );
    return response.data;
  }

  /**
   * Get refunds for a payment
   * @param id The payment ID
   * @returns Array of refunds
   */
  async getRefunds(id: string): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      `/payments/${id}/refunds`
    );
    return response.data;
  }

  /**
   * Get viewing info for a payment
   * @param id The payment ID
   * @returns Viewing info
   */
  async getViewingInfo(id: string): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      `/payments/${id}/viewingInfo`
    );
    return response.data;
  }
}
