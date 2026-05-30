/**
 * Main Asaas SDK Client
 */

import { AxiosInstance } from "axios";
import { createAsaasClient } from "./utils/client.ts";
import { CustomersModule } from "./modules/customers.ts";
import { SubscriptionsModule } from "./modules/subscriptions.ts";
import { PaymentsModule } from "./modules/payments.ts";
import { AccountsModule } from "./modules/accounts.ts";
import { InstallmentsModule } from "./modules/installments.ts";
import { PaymentLinksModule } from "./modules/paymentLinks.ts";
import { WebhooksModule } from "./modules/webhooks.ts";
import { TransfersModule } from "./modules/transfers.ts";
import { PixModule } from "./modules/pix.ts";
import { FinanceModule } from "./modules/finance.ts";
import { AnticipationsModule } from "./modules/anticipations.ts";
import { InvoicesModule } from "./modules/invoices.ts";
import { BillsModule } from "./modules/bills.ts";
import { PaymentDunningsModule } from "./modules/paymentDunnings.ts";
import { NotificationsModule } from "./modules/notifications.ts";
import { MobilePhoneRechargesModule } from "./modules/mobilePhoneRecharges.ts";
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
 * const customer = await client.customers.create({
 *   name: 'John Doe',
 *   cpfCnpj: '24971563792'
 * });
 * ```
 */
export class AsaasClient {
  private httpClient: AxiosInstance;

  public readonly customers: CustomersModule;
  public readonly subscriptions: SubscriptionsModule;
  public readonly payments: PaymentsModule;
  public readonly accounts: AccountsModule;
  public readonly installments: InstallmentsModule;
  public readonly paymentLinks: PaymentLinksModule;
  public readonly webhooks: WebhooksModule;
  public readonly transfers: TransfersModule;
  public readonly pix: PixModule;
  public readonly finance: FinanceModule;
  public readonly anticipations: AnticipationsModule;
  public readonly invoices: InvoicesModule;
  public readonly bills: BillsModule;
  public readonly paymentDunnings: PaymentDunningsModule;
  public readonly notifications: NotificationsModule;
  public readonly mobilePhoneRecharges: MobilePhoneRechargesModule;

  constructor(options: AsaasClientOptions) {
    this.httpClient = createAsaasClient(options.apiKey, options.environment);

    this.customers = new CustomersModule(this.httpClient);
    this.subscriptions = new SubscriptionsModule(this.httpClient);
    this.payments = new PaymentsModule(this.httpClient);
    this.accounts = new AccountsModule(this.httpClient);
    this.installments = new InstallmentsModule(this.httpClient);
    this.paymentLinks = new PaymentLinksModule(this.httpClient);
    this.webhooks = new WebhooksModule(this.httpClient);
    this.transfers = new TransfersModule(this.httpClient);
    this.pix = new PixModule(this.httpClient);
    this.finance = new FinanceModule(this.httpClient);
    this.anticipations = new AnticipationsModule(this.httpClient);
    this.invoices = new InvoicesModule(this.httpClient);
    this.bills = new BillsModule(this.httpClient);
    this.paymentDunnings = new PaymentDunningsModule(this.httpClient);
    this.notifications = new NotificationsModule(this.httpClient);
    this.mobilePhoneRecharges = new MobilePhoneRechargesModule(this.httpClient);
  }

  /**
   * Get the underlying Axios instance for advanced usage
   */
  public getHttpClient(): AxiosInstance {
    return this.httpClient;
  }
}
