# @gusnips/asaas

Unofficial TypeScript SDK for the [Asaas](https://www.asaas.com/) payment platform API.

Full coverage of the Asaas API v3 with typed interfaces, domain-based architecture, and proper error handling.

## Installation

```bash
npm install @gusnips/asaas
# or
yarn add @gusnips/asaas
# or
bun add @gusnips/asaas
```

## Quick Start

```typescript
import { AsaasClient, AsaasBillingType } from "@gusnips/asaas";

const client = new AsaasClient({
  apiKey: "$your_api_key",
  environment: "sandbox", // or 'production'
});

// Create a customer
const customer = await client.customers.create({
  name: "John Doe",
  cpfCnpj: "24971563792",
  email: "john@example.com",
});

// Create a payment
const payment = await client.payments.create({
  customer: customer.id,
  billingType: AsaasBillingType.PIX,
  value: 100.0,
  dueDate: "2025-12-15",
});

// Get PIX QR code
const pixQr = await client.payments.getPixQrCode(payment.id);
```

## Modules

| Module | Access | Description |
|--------|--------|-------------|
| Customers | `client.customers` | Customer CRUD, restore, list with filters |
| Payments | `client.payments` | Charges, refunds, status, PIX QR, boleto, credit card |
| Subscriptions | `client.subscriptions` | Recurring billing management |
| Installments | `client.installments` | Installment payments |
| Payment Links | `client.paymentLinks` | Shareable payment links |
| Transfers | `client.transfers` | Bank transfers, PIX, internal |
| PIX | `client.pix` | Address keys, QR codes, transactions |
| Finance | `client.finance` | Balance, extract, statistics |
| Invoices | `client.invoices` | Nota Fiscal (NFS-e) management |
| Bills | `client.bills` | Bill payments (boletos de terceiros) |
| Anticipations | `client.anticipations` | Receivable anticipation |
| Webhooks | `client.webhooks` | Webhook configuration |
| Accounts | `client.accounts` | Sub-accounts (White Label) |
| Payment Dunnings | `client.paymentDunnings` | Debt recovery (Serasa) |
| Notifications | `client.notifications` | Notification settings |
| Mobile Recharges | `client.mobilePhoneRecharges` | Cell phone top-ups |

## Usage Examples

### Payments

```typescript
// List payments with filters
const { data: payments, hasMore } = await client.payments.list({
  customer: "cus_xxx",
  status: AsaasPaymentStatus.PENDING,
  "dueDate[ge]": "2025-01-01",
  limit: 50,
});

// Refund a payment (full or partial)
await client.payments.refund("pay_xxx", 50.0, "Partial refund");

// Confirm cash receipt
await client.payments.receiveInCash("pay_xxx", "2025-06-01", 100.0);
```

### Subscriptions

```typescript
import { AsaasSubscriptionCycle } from "@gusnips/asaas";

const subscription = await client.subscriptions.create({
  customer: "cus_xxx",
  billingType: AsaasBillingType.CREDIT_CARD,
  cycle: AsaasSubscriptionCycle.MONTHLY,
  value: 49.9,
  nextDueDate: "2025-07-01",
});

// List subscription payments
const { data: payments } = await client.subscriptions.listPayments(subscription.id);
```

### Transfers

```typescript
// Transfer via PIX key
const transfer = await client.transfers.create({
  value: 500.0,
  pixAddressKey: "email@example.com",
  description: "Payment to supplier",
});

// Transfer to bank account
const bankTransfer = await client.transfers.create({
  value: 1000.0,
  operationType: AsaasTransferType.TED,
  bankAccount: {
    bank: { code: "237" },
    ownerName: "Jane Doe",
    cpfCnpj: "12345678901",
    agency: "1234",
    account: "567890",
    accountDigit: "1",
  },
});
```

### Finance

```typescript
// Get account balance
const { balance } = await client.finance.getBalance();

// Get financial extract
const { data: transactions } = await client.finance.getExtract({
  startDate: "2025-01-01",
  finishDate: "2025-01-31",
});
```

### Webhooks

```typescript
import { AsaasWebhookSendType } from "@gusnips/asaas";

await client.webhooks.create({
  name: "Payment Events",
  url: "https://myapp.com/webhooks/asaas",
  email: "dev@myapp.com",
  enabled: true,
  interrupted: false,
  apiVersion: 3,
  authToken: "your_auth_token_min_32_chars_long_here",
  sendType: AsaasWebhookSendType.SEQUENTIALLY,
  events: ["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED"],
});
```

### Invoices (Nota Fiscal)

```typescript
const invoice = await client.invoices.create({
  payment: "pay_xxx",
  serviceDescription: "Software development services",
  observations: "Monthly invoice",
  value: 5000,
  deductions: 0,
  effectiveDate: "2025-06-15",
  municipalServiceName: "Systems analysis and development",
  taxes: {
    retainIss: false,
    iss: 2,
    pis: 0.65,
    cofins: 3,
    csll: 1,
    inss: 0,
    ir: 1.5,
  },
});

// Issue the invoice
await client.invoices.authorize(invoice.id);
```

## Error Handling

The SDK throws `AsaasApiError` for API errors with structured error information:

```typescript
import { AsaasApiError } from "@gusnips/asaas";

try {
  await client.payments.create({ /* ... */ });
} catch (error) {
  if (error instanceof AsaasApiError) {
    console.error(`Status: ${error.status}`);
    console.error(`Message: ${error.message}`);
    console.error(`Errors:`, error.errors);
    // error.errors = [{ code: "invalid_customer", description: "..." }]
  }
}
```

## Environments

```typescript
// Sandbox (for testing)
const sandbox = new AsaasClient({
  apiKey: "$aact_sandbox_key",
  environment: "sandbox",
});

// Production
const production = new AsaasClient({
  apiKey: "$aact_production_key",
  environment: "production",
});
```

## Pagination

All list methods return a paginated response:

```typescript
interface AsaasApiPaginatedResponse<T> {
  data: T[];
  totalCount: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// Iterate through pages
let offset = 0;
let hasMore = true;

while (hasMore) {
  const response = await client.payments.list({ offset, limit: 100 });
  // process response.data
  hasMore = response.hasMore;
  offset += response.data.length;
}
```

## Advanced Usage

Access the underlying Axios instance for custom requests:

```typescript
const httpClient = client.getHttpClient();
const response = await httpClient.get("/some/custom/endpoint");
```

## Requirements

- TypeScript >= 5.0
- Node.js >= 18 (or Bun/Deno with npm compatibility)

## License

MIT
