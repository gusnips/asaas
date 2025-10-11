/**
 * Main Asaas SDK Client
 */

import { AxiosInstance } from "axios";
import { createAsaasClient } from "./utils/client.ts";
import { CustomersModule } from "./modules/customers.ts";
import { SubscriptionsModule } from "./modules/subscriptions.ts";
import { PaymentsModule } from "./modules/payments.ts";
import { AccountsModule } from "./modules/accounts.ts";
import { AsaasEnvironment } from "./types/index.ts";

export interface AsaasClientOptions {
  apiKey: string;
  environment?: AsaasEnvironment;
}

/**
 * Main Asaas SDK Client
 *
 * @example
 * ```typescript
 * const client = new AsaasClient({
 *   apiKey: 'your-api-key',
 *   environment: 'production'
 * });
 *
 * // Use domain-based methods
 * const customer = await client.customers.create({
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 * ```
 */
export class AsaasClient {
  private httpClient: AxiosInstance;

  // Domain modules
  public readonly customers: CustomersModule;
  public readonly subscriptions: SubscriptionsModule;
  public readonly payments: PaymentsModule;
  public readonly accounts: AccountsModule;

  /**
   * Create a new Asaas SDK Client
   * @param options Client configuration options
   */
  constructor(options: AsaasClientOptions) {
    this.httpClient = createAsaasClient(options.apiKey, options.environment);

    // Initialize domain modules
    this.customers = new CustomersModule(this.httpClient);
    this.subscriptions = new SubscriptionsModule(this.httpClient);
    this.payments = new PaymentsModule(this.httpClient);
    this.accounts = new AccountsModule(this.httpClient);
  }

  /**
   * Get the underlying Axios instance for advanced usage
   */
  public getHttpClient(): AxiosInstance {
    return this.httpClient;
  }
}
