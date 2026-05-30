/**
 * Invoice (Nota Fiscal) module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasInvoice,
  AsaasNfStatus,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export interface AsaasInvoiceCreateRequest {
  serviceDescription: string;
  observations: string;
  value: number;
  deductions: number;
  effectiveDate: string;
  municipalServiceName: string;
  taxes: {
    retainIss: boolean;
    iss: number;
    pis: number;
    cofins: number;
    csll: number;
    inss: number;
    ir: number;
  };
  payment?: string;
  installment?: string;
  customer?: string;
  externalReference?: string;
  municipalServiceId?: string;
  municipalServiceCode?: string;
  updatePayment?: boolean;
}

export interface AsaasListInvoicesParams {
  offset?: number;
  limit?: number;
  "effectiveDate[Ge]"?: string;
  "effectiveDate[Le]"?: string;
  payment?: string;
  installment?: string;
  externalReference?: string;
  status?: AsaasNfStatus;
  customer?: string;
}

export class InvoicesModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Schedule an invoice
   * @param data The invoice data
   * @returns The created invoice
   */
  async create(data: AsaasInvoiceCreateRequest): Promise<AsaasInvoice> {
    const response = await this.client.post<AsaasInvoice>("/invoices", data);
    return response.data;
  }

  /**
   * Retrieve an invoice by ID
   * @param id The invoice ID
   * @returns The invoice
   */
  async retrieve(id: string): Promise<AsaasInvoice> {
    const response = await this.client.get<AsaasInvoice>(`/invoices/${id}`);
    return response.data;
  }

  /**
   * Update an invoice
   * @param id The invoice ID
   * @param data The invoice data to update
   * @returns The updated invoice
   */
  async update(
    id: string,
    data: Partial<AsaasInvoiceCreateRequest>
  ): Promise<AsaasInvoice> {
    const response = await this.client.put<AsaasInvoice>(
      `/invoices/${id}`,
      data
    );
    return response.data;
  }

  /**
   * List invoices with optional filters
   * @param params Filter and pagination parameters
   * @returns Paginated list of invoices
   */
  async list(
    params: AsaasListInvoicesParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasInvoice>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasInvoice>
    >("/invoices", { params });
    return response.data;
  }

  /**
   * Authorize (issue) an invoice
   * @param id The invoice ID
   * @returns The authorized invoice
   */
  async authorize(id: string): Promise<AsaasInvoice> {
    const response = await this.client.post<AsaasInvoice>(
      `/invoices/${id}/authorize`
    );
    return response.data;
  }

  /**
   * Cancel an invoice
   * @param id The invoice ID
   * @returns The cancelled invoice
   */
  async cancel(id: string): Promise<AsaasInvoice> {
    const response = await this.client.post<AsaasInvoice>(
      `/invoices/${id}/cancel`
    );
    return response.data;
  }
}
