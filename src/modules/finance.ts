/**
 * Finance module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasFinancialTransaction,
  AsaasAccountBalance,
  AsaasPaymentStatistics,
  AsaasListFinancialTransactionsParams,
  AsaasApiPaginatedResponse,
} from "../types/index.ts";

export class FinanceModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Retrieve account balance
   * @returns The account balance
   */
  async getBalance(): Promise<AsaasAccountBalance> {
    const response = await this.client.get<AsaasAccountBalance>(
      "/finance/balance"
    );
    return response.data;
  }

  /**
   * Retrieve financial extract (transactions)
   * @param params Filter and pagination parameters
   * @returns Paginated list of financial transactions
   */
  async getExtract(
    params: AsaasListFinancialTransactionsParams = {}
  ): Promise<AsaasApiPaginatedResponse<AsaasFinancialTransaction>> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasFinancialTransaction>
    >("/financialTransactions", { params });
    return response.data;
  }

  /**
   * Retrieve payment/collections statistics
   * @returns Payment statistics
   */
  async getPaymentStatistics(): Promise<AsaasPaymentStatistics> {
    const response = await this.client.get<AsaasPaymentStatistics>(
      "/finance/payment/statistics"
    );
    return response.data;
  }

  /**
   * Retrieve split values statistics
   * @returns Split statistics
   */
  async getSplitStatistics(): Promise<Record<string, unknown>> {
    const response = await this.client.get<Record<string, unknown>>(
      "/finance/split/statistics"
    );
    return response.data;
  }
}
