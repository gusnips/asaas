# Asaas SDK

**Unofficial** TypeScript SDK for the Asaas payment gateway API with domain-based architecture.

> ⚠️ **Note:** This is an unofficial SDK and is not affiliated with or endorsed by Asaas.

## Features

- ✅ Full TypeScript support with comprehensive type definitions
- 🏗️ Domain-based architecture (`client.domain.method()`)
- 🔒 Type-safe API with IntelliSense support
- 🚀 Built with modern tools (Bun, TypeScript, ESLint)
- 📦 Zero dependencies (except axios)
- 🌍 Support for both production and sandbox environments

## Installation

```bash
# Using bun
bun add @gusnips/asaas

# Using npm
npm install @gusnips/asaas

# Using yarn
yarn add @gusnips/asaas
```

## Quick Start

```typescript
import { AsaasClient } from "@gusnips/asaas";

// Initialize the client
const client = new AsaasClient({
  apiKey: "your-api-key-here",
  environment: "production", // or 'sandbox'
});

// Create a customer
const customer = await client.customers.create({
  name: "John Doe",
  email: "john@example.com",
  cpfCnpj: "12345678901",
});

// Create a subscription
const subscription = await client.subscriptions.create({
  customer: customer.id,
  billingType: "CREDIT_CARD",
  value: 99.9,
  cycle: "MONTHLY",
  nextDueDate: "2025-11-01",
});
```

## API Reference

### Client Initialization

```typescript
const client = new AsaasClient({
  apiKey: string;        // Your Asaas API key
  environment?: 'production' | 'sandbox'; // Default: 'production'
});
```

---

## Customers Module

Manage customer information.

### `client.customers.create(data)`

Create a new customer.

```typescript
const customer = await client.customers.create({
  name: "John Doe",
  email: "john@example.com",
  cpfCnpj: "12345678901",
  phone: "1234567890",
  mobilePhone: "11987654321",
  postalCode: "12345-678",
  addressNumber: "123",
});
```

**Parameters:**

- `name` (string, required): Customer name
- `email` (string, required): Customer email
- `cpfCnpj` (string, optional): Customer CPF or CNPJ
- `phone` (string, optional): Phone number
- `mobilePhone` (string, optional): Mobile phone number
- `postalCode` (string, optional): Postal code
- `addressNumber` (string, optional): Address number
- Additional fields available in `AsaasCustomer` type

**Returns:** `Promise<AsaasCustomer>`

### `client.customers.retrieve(customerId)`

Retrieve a customer by ID.

```typescript
const customer = await client.customers.retrieve("cus_123456");
```

**Parameters:**

- `customerId` (string, required): Customer ID

**Returns:** `Promise<AsaasCustomer>`

### `client.customers.update(customerId, data)`

Update customer information.

```typescript
const customer = await client.customers.update("cus_123456", {
  name: "Jane Doe",
  email: "jane@example.com",
});
```

**Parameters:**

- `customerId` (string, required): Customer ID
- `data` (object, required): Customer data to update

**Returns:** `Promise<AsaasCustomer>`

### `client.customers.list(limit?, offset?)`

List customers.

```typescript
const customers = await client.customers.list(100, 0);
```

**Parameters:**

- `limit` (number, optional): Maximum number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Returns:** `Promise<AsaasCustomer[]>`

---

## Subscriptions Module

Manage recurring subscriptions.

### `client.subscriptions.create(data)`

Create a new subscription.

```typescript
const subscription = await client.subscriptions.create({
  customer: "cus_123456",
  billingType: "CREDIT_CARD",
  value: 99.9,
  cycle: "MONTHLY",
  nextDueDate: "2025-11-01",
  description: "Monthly subscription",
});
```

**Parameters:**

- `customer` (string, required): Customer ID
- `billingType` (string, required): Payment method (`BOLETO`, `CREDIT_CARD`, `PIX`, etc.)
- `value` (number, required): Subscription value
- `cycle` (string, required): Billing cycle (`WEEKLY`, `MONTHLY`, `YEARLY`, etc.)
- `nextDueDate` (string, required): Next payment due date (YYYY-MM-DD)
- `description` (string, optional): Subscription description
- Additional fields available in `AsaasSubscription` type

**Returns:** `Promise<AsaasSubscription>`

### `client.subscriptions.retrieve(subscriptionId)`

Retrieve a subscription by ID.

```typescript
const subscription = await client.subscriptions.retrieve("sub_123456");
```

**Parameters:**

- `subscriptionId` (string, required): Subscription ID

**Returns:** `Promise<AsaasSubscription>`

### `client.subscriptions.list(customerId?, status?)`

List subscriptions for a customer (or all subscriptions if no customer specified).

```typescript
// List for specific customer
const subscriptions = await client.subscriptions.list("cus_123456", "ACTIVE");

// List all subscriptions
const allSubscriptions = await client.subscriptions.list();
```

**Parameters:**

- `customerId` (string, optional): Customer ID to filter by
- `status` (string, optional): Filter by status (`ACTIVE`, `INACTIVE`)

**Returns:** `Promise<AsaasSubscription[]>`

### `client.subscriptions.update(subscriptionId, data)`

Update a subscription.

```typescript
const subscription = await client.subscriptions.update("sub_123456", {
  value: 149.9,
  nextDueDate: "2025-12-01",
});
```

**Parameters:**

- `subscriptionId` (string, required): Subscription ID
- `data` (object, required): Subscription data to update

**Returns:** `Promise<AsaasSubscription>`

### `client.subscriptions.reactivate(subscriptionId, data?)`

Reactivate a canceled subscription.

```typescript
const subscription = await client.subscriptions.reactivate("sub_123456");
```

**Parameters:**

- `subscriptionId` (string, required): Subscription ID
- `data` (object, optional): Additional subscription data

**Returns:** `Promise<AsaasSubscription>`

### `client.subscriptions.cancel(subscriptionId)`

Cancel a subscription.

```typescript
const subscription = await client.subscriptions.cancel("sub_123456");
```

**Parameters:**

- `subscriptionId` (string, required): Subscription ID

**Returns:** `Promise<AsaasSubscription>`

---

## Payments Module

Manage individual payments and invoices.

### `client.payments.create(data)`

Create a new payment.

```typescript
const payment = await client.payments.create({
  customer: "cus_123456",
  billingType: "BOLETO",
  value: 199.9,
  dueDate: "2025-11-15",
  description: "One-time payment",
});
```

**Parameters:**

- `customer` (string, required): Customer ID
- `billingType` (string, required): Payment method
- `value` (number, required): Payment value
- `dueDate` (string, required): Payment due date (YYYY-MM-DD)
- `description` (string, optional): Payment description
- Additional fields available in `AsaasPayment` type

**Returns:** `Promise<AsaasPayment>`

### `client.payments.retrieve(paymentId)`

Retrieve a payment by ID.

```typescript
const payment = await client.payments.retrieve("pay_123456");
```

**Parameters:**

- `paymentId` (string, required): Payment ID

**Returns:** `Promise<AsaasPayment>`

### `client.payments.update(paymentId, data)`

Update a payment.

```typescript
const payment = await client.payments.update("pay_123456", {
  value: 249.9,
  dueDate: "2025-12-15",
});
```

**Parameters:**

- `paymentId` (string, required): Payment ID
- `data` (object, required): Payment data to update

**Returns:** `Promise<AsaasPayment>`

### `client.payments.list(customerId, options?)`

List payments for a customer.

```typescript
const payments = await client.payments.list("cus_123456", {
  status: "PENDING",
  limit: 10,
  offset: 0,
});
```

**Parameters:**

- `customerId` (string, required): Customer ID
- `options` (object, optional): Filter options
  - `status` (string): Filter by status
  - `limit` (number): Maximum number of results
  - `offset` (number): Pagination offset
  - Additional options in `AsaasListPaymentsOptions` type

**Returns:** `Promise<AsaasPayment[]>`

### `client.payments.getLatest(customerId)`

Get the latest payment for a customer.

```typescript
const payment = await client.payments.getLatest("cus_123456");
```

**Parameters:**

- `customerId` (string, required): Customer ID

**Returns:** `Promise<AsaasPayment | null>`

### `client.payments.getOverdue(customerId, limit?, offset?)`

Get all overdue payments for a customer.

```typescript
const overduePayments = await client.payments.getOverdue("cus_123456", 100, 0);
```

**Parameters:**

- `customerId` (string, required): Customer ID
- `limit` (number, optional): Maximum number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Returns:** `Promise<AsaasPayment[]>`

### `client.payments.getBillingInfo(paymentId)`

Get billing information for a payment.

```typescript
const billingInfo = await client.payments.getBillingInfo("pay_123456");
```

**Parameters:**

- `paymentId` (string, required): Payment ID

**Returns:** `Promise<AsaasPaymentBillingInfo>`

### `client.payments.getBoleto(paymentId)`

Get boleto information for a payment.

```typescript
const boleto = await client.payments.getBoleto("pay_123456");
// Returns: { barCode, identificationField, nossoNumero }
```

**Parameters:**

- `paymentId` (string, required): Payment ID

**Returns:** `Promise<AsaasBoletoInfo>`

### `client.payments.getPixQrCode(paymentId)`

Get PIX QR code for a payment.

```typescript
const pixQrCode = await client.payments.getPixQrCode("pay_123456");
// Returns: { encodedImage, payload, expirationDate }
```

**Parameters:**

- `paymentId` (string, required): Payment ID

**Returns:** `Promise<AsaasPixQrCode>`

### `client.payments.tokenizeCreditCard(data)`

Tokenize a credit card for future use.

```typescript
const token = await client.payments.tokenizeCreditCard({
  customer: "cus_123456",
  creditCard: {
    holderName: "John Doe",
    number: "4111111111111111",
    expiryMonth: "12",
    expiryYear: "2028",
    ccv: "123",
  },
  creditCardHolderInfo: {
    name: "John Doe",
    email: "john@example.com",
    cpfCnpj: "12345678901",
    postalCode: "12345-678",
    addressNumber: "123",
  },
  remoteIp: "192.168.1.1",
});
```

**Parameters:**

- `data` (object, required): Credit card tokenization data (see `AsaasCreditCardTokenizationRequest`)

**Returns:** `Promise<AsaasCreditCardToken>`

### `client.payments.createPaymentLink(data)`

Create a payment link.

```typescript
const paymentLink = await client.payments.createPaymentLink({
  name: "Product Payment",
  chargeType: "DETACHED",
  billingType: "CREDIT_CARD",
  value: 99.9,
});
```

**Parameters:**

- `data` (object, required): Payment link data

**Returns:** `Promise<any>`

### `client.payments.createProrated(customerId, subscriptionId, amount, description, paymentMethod, externalReference?)`

Create a prorated payment.

```typescript
const payment = await client.payments.createProrated(
  "cus_123456",
  "sub_123456",
  5000, // Amount in cents
  "Prorated payment for plan upgrade",
  { type: "CREDIT_CARD", creditCardToken: "tok_123456" }
);
```

**Parameters:**

- `customerId` (string, required): Customer ID
- `subscriptionId` (string, required): Subscription ID
- `amount` (number, required): Amount in cents
- `description` (string, required): Payment description
- `paymentMethod` (object, required): Payment method configuration
- `externalReference` (string, optional): External reference ID

**Returns:** `Promise<AsaasPayment>`

### `client.payments.cancel(paymentId)`

Cancel a payment.

```typescript
const payment = await client.payments.cancel("pay_123456");
```

**Parameters:**

- `paymentId` (string, required): Payment ID

**Returns:** `Promise<AsaasPayment>`

### `client.payments.cancelOpenInvoices(customerId, excludePaymentId?)`

Cancel all open invoices for a customer.

```typescript
const canceledIds = await client.payments.cancelOpenInvoices(
  "cus_123456",
  "pay_exclude"
);
```

**Parameters:**

- `customerId` (string, required): Customer ID
- `excludePaymentId` (string, optional): Payment ID to exclude from cancellation

**Returns:** `Promise<string[]>` - Array of canceled payment IDs

### `client.payments.listAllOverdue(limit?, offset?)`

List all overdue payments (not filtered by customer).

```typescript
const overduePayments = await client.payments.listAllOverdue(100, 0);
```

**Parameters:**

- `limit` (number, optional): Maximum number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Returns:** `Promise<AsaasPayment[]>`

---

## Accounts Module

Manage sub-accounts, wallets, and commercial information.

### `client.accounts.createSubAccount(data)`

Create a sub-account.

```typescript
const subAccount = await client.accounts.createSubAccount({
  name: "Partner Store",
  email: "partner@store.com",
  cpfCnpj: "12345678000199",
  companyType: "LIMITED",
  mobilePhone: "11987654321",
  address: "Main Street",
  addressNumber: "123",
  province: "Downtown",
  postalCode: "12345-678",
  incomeValue: 10000,
});
```

**Parameters:**

- `data` (object, required): Sub-account data (see `AsaasSubAccountRequest`)

**Returns:** `Promise<AsaasSubAccount>`

### `client.accounts.retrieveSubAccount(subAccountId)`

Retrieve a sub-account by ID.

```typescript
const subAccount = await client.accounts.retrieveSubAccount("acc_123456");
```

**Parameters:**

- `subAccountId` (string, required): Sub-account ID

**Returns:** `Promise<AsaasSubAccount>`

### `client.accounts.updateSubAccount(subAccountId, data)`

Update a sub-account.

```typescript
const subAccount = await client.accounts.updateSubAccount("acc_123456", {
  name: "Updated Store Name",
  mobilePhone: "11999999999",
});
```

**Parameters:**

- `subAccountId` (string, required): Sub-account ID
- `data` (object, required): Sub-account data to update

**Returns:** `Promise<AsaasSubAccount>`

### `client.accounts.listSubAccounts(options?)`

List all sub-accounts.

```typescript
const subAccounts = await client.accounts.listSubAccounts({
  limit: 10,
  offset: 0,
});
```

**Parameters:**

- `options` (object, optional): Pagination options
  - `limit` (number): Maximum number of results
  - `offset` (number): Pagination offset

**Returns:** `Promise<AsaasSubAccount[]>`

### `client.accounts.getWallets()`

Get wallets for the account.

```typescript
const wallets = await client.accounts.getWallets();
```

**Returns:** `Promise<AsaasWalletsResponse>`

### `client.accounts.getCommercialInfo()`

Get commercial information for the account.

```typescript
const commercialInfo = await client.accounts.getCommercialInfo();
```

**Returns:** `Promise<AsaasCommercialInfo>`

---

## Type Definitions

The SDK provides comprehensive TypeScript type definitions for all API entities:

### Common Types

- `AsaasBillingType` - Payment method types
- `AsaasDiscountType` - Discount types
- `AsaasEnvironment` - Environment types
- `AsaasApiError` - Error class
- `AsaasApiPaginatedResponse<T>` - Paginated response wrapper

### Customer Types

- `AsaasCustomer` - Customer entity

### Subscription Types

- `AsaasSubscription` - Subscription entity
- `AsaasSubscriptionCycle` - Billing cycles
- `AsaasSubscriptionStatus` - Subscription statuses
- `AsaasSubscriptionRequest` - Create/update request
- `AsaasSplit` - Split configuration

### Payment Types

- `AsaasPayment` - Payment entity
- `AsaasPaymentStatus` - Payment statuses
- `AsaasPaymentBillingInfo` - Billing information
- `AsaasPixQrCode` - PIX QR code data
- `AsaasBoletoInfo` - Boleto information
- `AsaasCreditCardToken` - Tokenized credit card
- `AsaasListPaymentsOptions` - Payment list filters

### Account Types

- `AsaasSubAccount` - Sub-account entity
- `AsaasSubAccountRequest` - Sub-account creation
- `AsaasWalletsResponse` - Wallet information
- `AsaasCommercialInfo` - Commercial information
- `AsaasPersonType` - Person types
- `AsaasCompanyType` - Company types

---

## Error Handling

The SDK throws `AsaasApiError` for API errors:

```typescript
import { AsaasApiError } from "@gusnips/asaas";

try {
  const customer = await client.customers.create({
    name: "John Doe",
    email: "invalid-email",
  });
} catch (error) {
  if (error instanceof AsaasApiError) {
    console.error("Status:", error.status);
    console.error("Message:", error.message);
    console.error("Errors:", error.errors);
  }
}
```

---

## Development

### Setup

```bash
# Install dependencies
bun install

# Run type checking
bun run typecheck

# Run linter
bun run lint

# Build the package
bun run build
```

### Project Structure

```
src/
├── client.ts           # Main client class
├── index.ts            # Main export file
├── modules/            # Domain modules
│   ├── customers.ts
│   ├── subscriptions.ts
│   ├── payments.ts
│   └── accounts.ts
├── types/              # Type definitions
│   ├── common.ts
│   ├── customer.ts
│   ├── subscription.ts
│   ├── payment.ts
│   ├── account.ts
│   └── index.ts
└── utils/              # Utilities
    └── client.ts       # HTTP client configuration
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Follow the existing code style
2. Use DRY principles
3. Create modular, reusable, and maintainable code
4. Reuse existing patterns
5. Never change code unrelated to the task
6. Add tests for new features

---

## License

MIT

---

## Links

- [Asaas API Documentation](https://docs.asaas.com/)
- [GitHub Repository](https://github.com/gusnips/asaas)
- [NPM Package](https://www.npmjs.com/package/@gusnips/asaas)
