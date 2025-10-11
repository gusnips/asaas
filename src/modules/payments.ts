/**
 * Payment management module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasPayment,
  AsaasPaymentBillingInfo,
  AsaasBoletoInfo,
  AsaasPixQrCode,
  AsaasCreditCardToken,
  AsaasListPaymentsOptions,
  AsaasApiPaginatedResponse,
  AsaasPaymentStatus,
  AsaasCreditCardTokenizationRequest,
  AsaasBillingType,
} from "../types/index.ts";

export class PaymentsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a payment
   * @param paymentData The payment data
   * @returns The created payment
   */
  async create(paymentData: Partial<AsaasPayment>): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      "/payments",
      paymentData
    );
    return response.data;
  }

  /**
   * Retrieve a payment
   * @param paymentId The payment ID
   * @returns The payment
   */
  async retrieve(paymentId: string): Promise<AsaasPayment> {
    const response = await this.client.get<AsaasPayment>(
      `/payments/${paymentId}`
    );
    return response.data;
  }

  /**
   * Update a payment
   * @param paymentId The payment ID
   * @param paymentData The payment data
   * @returns The updated payment
   */
  async update(
    paymentId: string,
    paymentData: Partial<AsaasPayment>
  ): Promise<AsaasPayment> {
    const response = await this.client.post<AsaasPayment>(
      `/payments/${paymentId}`,
      paymentData
    );
    return response.data;
  }

  /**
   * List payments for a customer
   * @param customerId The customer ID
   * @param options The options for the request
   * @returns Array of payments
   */
  async list(
    customerId: string,
    options: AsaasListPaymentsOptions = {}
  ): Promise<AsaasPayment[]> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPayment>
    >("/payments", {
      params: { customer: customerId, ...options },
    });
    return response.data.data || [];
  }

  /**
   * Get the latest payment for a customer
   * @param customerId The customer ID
   * @returns The latest payment or null
   */
  async getLatest(customerId: string): Promise<AsaasPayment | null> {
    const payments = await this.list(customerId, {
      limit: 1,
      offset: 0,
    });
    return payments && payments.length > 0 ? payments[0] ?? null : null;
  }

  /**
   * Get all overdue payments for a customer
   * @param customerId The customer ID
   * @param limit Maximum number of payments to return
   * @param offset Offset for pagination
   * @returns Array of overdue payments
   */
  async getOverdue(
    customerId: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<AsaasPayment[]> {
    const payments = await this.list(customerId, {
      status: AsaasPaymentStatus.OVERDUE,
      limit,
      offset,
    });
    return payments || [];
  }

  /**
   * Get the billing info for a payment
   * @param paymentId The payment ID
   * @returns The billing info
   */
  async getBillingInfo(paymentId: string): Promise<AsaasPaymentBillingInfo> {
    const response = await this.client.get<AsaasPaymentBillingInfo>(
      `/payments/${paymentId}/billingInfo`
    );
    return response.data;
  }

  /**
   * Get boleto information for a payment
   * @param paymentId The payment ID
   * @returns The boleto info
   */
  async getBoleto(paymentId: string): Promise<AsaasBoletoInfo> {
    const response = await this.client.get<AsaasBoletoInfo>(
      `/payments/${paymentId}/identificationField`
    );
    return response.data;
  }

  /**
   * Get PIX QR code for a payment
   * @param paymentId The payment ID
   * @returns The PIX QR code
   */
  async getPixQrCode(paymentId: string): Promise<AsaasPixQrCode> {
    const response = await this.client.get<AsaasPixQrCode>(
      `/payments/${paymentId}/pixQrCode`
    );
    return response.data;
  }

  /**
   * Tokenize a credit card
   * @param creditCardData The credit card data
   * @returns The credit card token
   */
  async tokenizeCreditCard(
    creditCardData: AsaasCreditCardTokenizationRequest
  ): Promise<AsaasCreditCardToken> {
    const response = await this.client.post<AsaasCreditCardToken>(
      "/creditCard/tokenize",
      creditCardData
    );
    return response.data;
  }

  /**
   * Create a payment link
   * @param paymentLinkData The payment link data
   * @returns The created payment link
   */
  async createPaymentLink(
    paymentLinkData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const response = await this.client.post<Record<string, unknown>>(
      "/paymentLinks",
      paymentLinkData
    );
    return response.data;
  }

  /**
   * Create a prorated payment
   * @param customerId The customer ID
   * @param subscriptionId The subscription ID
   * @param proratedAmount The prorated amount in cents
   * @param description The payment description
   * @param paymentMethod The payment method
   * @param customExternalReference Optional external reference
   * @returns The created payment
   */
  async createProrated(
    customerId: string,
    subscriptionId: string,
    proratedAmount: number,
    description: string,
    paymentMethod: {
      type: string;
      creditCardToken?: string;
    },
    customExternalReference?: string | null
  ): Promise<AsaasPayment> {
    const paymentData: Partial<AsaasPayment> & { creditCardToken?: string } = {
      customer: customerId,
      value: proratedAmount / 100, // Convert cents to reais
      dueDate: new Date().toISOString().split("T")[0] || "", // Today
      description,
      externalReference:
        customExternalReference || `prorated_${subscriptionId}`,
      billingType: paymentMethod.type as AsaasBillingType,
    };

    // Add credit card token if applicable
    if (paymentMethod.type === "CREDIT_CARD" && paymentMethod.creditCardToken) {
      paymentData.creditCardToken = paymentMethod.creditCardToken;
    }

    const response = await this.client.post<AsaasPayment>(
      "/payments",
      paymentData
    );
    return response.data;
  }

  /**
   * Cancel or delete an open payment (invoice)
   * @param paymentId The ID of the payment to cancel
   * @returns The canceled payment
   */
  async cancel(paymentId: string): Promise<AsaasPayment> {
    const response = await this.client.delete<AsaasPayment>(
      `/payments/${paymentId}`
    );
    return response.data;
  }

  /**
   * Cancels all open invoices for a customer
   * Only cancels invoices that are not yet due or paid
   * @param customerId The customer ID
   * @param excludePaymentId Optional payment ID to exclude from cancellation
   * @returns Array of canceled payment IDs
   */
  async cancelOpenInvoices(
    customerId: string,
    excludePaymentId?: string
  ): Promise<string[]> {
    // Get all open payments for the customer
    const openPayments = await this.list(customerId, {
      status: AsaasPaymentStatus.PENDING,
    });

    const canceledPaymentIds: string[] = [];

    // Cancel each payment that's not yet due and not the excluded payment
    for (const payment of openPayments) {
      // Skip the payment we want to exclude (like a plan change payment)
      if (excludePaymentId && payment.id === excludePaymentId) {
        continue;
      }

      // Only cancel payments that are in the future (not overdue)
      const dueDate = new Date(payment.dueDate);
      const today = new Date();

      if (
        dueDate >= today &&
        ![
          AsaasPaymentStatus.RECEIVED,
          AsaasPaymentStatus.CONFIRMED,
          AsaasPaymentStatus.REFUNDED,
        ].includes(payment.status)
      ) {
        await this.cancel(payment.id);
        canceledPaymentIds.push(payment.id);
      }
    }

    return canceledPaymentIds;
  }

  /**
   * List all overdue payments (not filtered by customer)
   * @param limit Maximum number of results
   * @param offset Pagination offset
   * @returns Array of overdue payments
   */
  async listAllOverdue(
    limit: number = 100,
    offset: number = 0
  ): Promise<AsaasPayment[]> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasPayment>
    >("/payments", {
      params: {
        status: AsaasPaymentStatus.OVERDUE,
        limit,
        offset,
      },
    });
    return response.data.data || [];
  }
}
