/**
 * Asaas SDK Usage Examples
 */

import { AsaasClient, AsaasBillingType, AsaasSubscriptionCycle } from "./src/index.ts";

// Initialize the client
const client = new AsaasClient({
  apiKey: "$your_api_key",
  environment: "sandbox",
});

// ─── Customers ───────────────────────────────────────────────────────────────

async function customerExamples() {
  // Create a customer
  const customer = await client.customers.create({
    name: "John Doe",
    cpfCnpj: "24971563792",
    email: "john@example.com",
    mobilePhone: "11999999999",
  });

  // List customers with filters
  const customers = await client.customers.list({
    name: "John",
    limit: 10,
  });

  // Update a customer
  await client.customers.update(customer.id, {
    email: "newemail@example.com",
  });

  // Restore a deleted customer
  await client.customers.restore(customer.id);
}

// ─── Payments ────────────────────────────────────────────────────────────────

async function paymentExamples() {
  // Create a payment
  const payment = await client.payments.create({
    customer: "cus_000005401844",
    billingType: AsaasBillingType.PIX,
    value: 100.0,
    dueDate: "2025-12-15",
    description: "Order #12345",
  });

  // List payments with filters
  const payments = await client.payments.list({
    customer: "cus_000005401844",
    status: undefined,
    "dueDate[ge]": "2025-01-01",
    limit: 50,
  });

  // Get PIX QR code
  const pixQr = await client.payments.getPixQrCode(payment.id);

  // Refund a payment
  await client.payments.refund(payment.id, 50.0, "Partial refund");

  // Get payment status
  const status = await client.payments.getStatus(payment.id);

  // Confirm cash receipt
  await client.payments.receiveInCash(payment.id, "2025-06-01", 100.0);
}

// ─── Subscriptions ───────────────────────────────────────────────────────────

async function subscriptionExamples() {
  // Create a subscription
  const subscription = await client.subscriptions.create({
    customer: "cus_000005401844",
    billingType: AsaasBillingType.CREDIT_CARD,
    cycle: AsaasSubscriptionCycle.MONTHLY,
    value: 49.9,
    nextDueDate: "2025-07-01",
    description: "Pro Plan",
  });

  // List subscriptions
  const subs = await client.subscriptions.list({
    customer: "cus_000005401844",
    status: undefined,
  });

  // List payments of a subscription
  const subPayments = await client.subscriptions.listPayments(subscription.id);

  // Update a subscription
  await client.subscriptions.update(subscription.id, {
    value: 59.9,
  });
}

// ─── Installments ────────────────────────────────────────────────────────────

async function installmentExamples() {
  // Create an installment
  const installment = await client.installments.create({
    customer: "cus_000005401844",
    billingType: AsaasBillingType.BOLETO,
    installmentCount: 3,
    value: 100.0,
    dueDate: "2025-08-01",
    description: "Order #56789",
  });

  // List installment payments
  const payments = await client.installments.listPayments(installment.id);

  // Refund an installment
  await client.installments.refund(installment.id);
}

// ─── Payment Links ───────────────────────────────────────────────────────────

async function paymentLinkExamples() {
  const { AsaasChargeType } = await import("./src/index.ts");

  // Create a payment link
  const link = await client.paymentLinks.create({
    name: "Product Sale",
    billingType: "UNDEFINED",
    chargeType: AsaasChargeType.DETACHED,
    value: 150.0,
    description: "Buy our product",
  });

  // List payment links
  const links = await client.paymentLinks.list({ active: true });
}

// ─── Webhooks ────────────────────────────────────────────────────────────────

async function webhookExamples() {
  const { AsaasWebhookSendType } = await import("./src/index.ts");

  // Create a webhook
  const webhook = await client.webhooks.create({
    name: "Payment Events",
    url: "https://myapp.com/webhooks/asaas",
    email: "dev@myapp.com",
    enabled: true,
    interrupted: false,
    apiVersion: 3,
    authToken: "whsec_my_secret_token_at_least_32_chars_long",
    sendType: AsaasWebhookSendType.SEQUENTIALLY,
    events: ["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED"],
  });

  // List webhooks
  const webhooks = await client.webhooks.list();
}

// ─── Transfers ───────────────────────────────────────────────────────────────

async function transferExamples() {
  // Transfer via PIX key
  const transfer = await client.transfers.create({
    value: 500.0,
    pixAddressKey: "email@example.com",
    pixAddressKeyType: undefined,
    description: "Payment to supplier",
  });

  // List transfers
  const transfers = await client.transfers.list({
    "dateCreated[ge]": "2025-01-01",
  });
}

// ─── PIX ─────────────────────────────────────────────────────────────────────

async function pixExamples() {
  // Create a PIX key
  const key = await client.pix.createKey("EVP");

  // List keys
  const keys = await client.pix.listKeys();

  // Create a static QR code
  const qrCode = await client.pix.createStaticQrCode({
    addressKey: key.key,
    description: "Donation",
    value: 25.0,
  });

  // List PIX transactions
  const transactions = await client.pix.listTransactions({
    limit: 20,
  });
}

// ─── Finance ─────────────────────────────────────────────────────────────────

async function financeExamples() {
  // Get account balance
  const balance = await client.finance.getBalance();
  console.log(`Balance: R$ ${balance.balance}`);

  // Get financial extract
  const extract = await client.finance.getExtract({
    startDate: "2025-01-01",
    finishDate: "2025-01-31",
  });

  // Get payment statistics
  const stats = await client.finance.getPaymentStatistics();
}
