/**
 * Asaas SDK - TypeScript client for Asaas API
 *
 * @packageDocumentation
 */

// Export main client
export { AsaasClient } from "./client.ts";
export type { AsaasClientOptions } from "./client.ts";

// Export all types
export * from "./types/index.ts";

// Export modules for advanced usage
export { CustomersModule } from "./modules/customers.ts";
export { SubscriptionsModule } from "./modules/subscriptions.ts";
export { PaymentsModule } from "./modules/payments.ts";
export { AccountsModule } from "./modules/accounts.ts";
