/**
 * Account management module for Asaas SDK (Sub-accounts, Wallets, Commercial Info)
 */

import { AxiosInstance } from "axios";
import {
  AsaasSubAccount,
  AsaasSubAccountRequest,
  AsaasSubAccountUpdateRequest,
  AsaasApiPaginatedResponse,
  AsaasWalletsResponse,
  AsaasCommercialInfo,
} from "../types/index.ts";

export class AccountsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Create a sub-account
   * @param subAccountData The sub-account data
   * @returns The created sub-account
   */
  async createSubAccount(
    subAccountData: AsaasSubAccountRequest
  ): Promise<AsaasSubAccount> {
    const response = await this.client.post<AsaasSubAccount>(
      "/accounts",
      subAccountData
    );
    return response.data;
  }

  /**
   * Retrieve a sub-account
   * @param subAccountId The sub-account ID
   * @returns The sub-account
   */
  async retrieveSubAccount(subAccountId: string): Promise<AsaasSubAccount> {
    const response = await this.client.get<AsaasSubAccount>(
      `/accounts/${subAccountId}`
    );
    return response.data;
  }

  /**
   * Update a sub-account
   * @param subAccountId The sub-account ID
   * @param updateData The update data
   * @returns The updated sub-account
   */
  async updateSubAccount(
    subAccountId: string,
    updateData: AsaasSubAccountUpdateRequest
  ): Promise<AsaasSubAccount> {
    const response = await this.client.post<AsaasSubAccount>(
      `/accounts/${subAccountId}`,
      updateData
    );
    return response.data;
  }

  /**
   * List sub-accounts
   * @param options The options for the request
   * @returns Array of sub-accounts
   */
  async listSubAccounts(
    options: {
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<AsaasSubAccount[]> {
    const response = await this.client.get<
      AsaasApiPaginatedResponse<AsaasSubAccount>
    >("/accounts", { params: options });
    return response.data.data || [];
  }

  /**
   * Get wallets for an account
   * @returns Wallets response
   */
  async getWallets(): Promise<AsaasWalletsResponse> {
    const response = await this.client.get<AsaasWalletsResponse>("/wallets/");
    return response.data;
  }

  /**
   * Get commercial info for an account
   * @returns Commercial info
   */
  async getCommercialInfo(): Promise<AsaasCommercialInfo> {
    const response = await this.client.get<AsaasCommercialInfo>(
      "/myAccount/commercialInfo/"
    );
    return response.data;
  }
}
