/**
 * Example usage of the Asaas SDK
 *
 * This file demonstrates how to use the SDK to interact with the Asaas API
 */

import {
  AsaasClient,
  AsaasBillingType,
  AsaasSubscriptionCycle,
} from "@gusnips/asaas";

// Initialize the client
const client = new AsaasClient({
  apiKey: process.env.ASAAS_API_KEY || "your-api-key-here",
  environment: "sandbox", // or 'production', default is 'production'
});

async function main() {
  try {
    // 1. Create a customer
    console.log("Creating customer...");
    const customer = await client.customers.create({
      name: "John Doe",
      email: "john@example.com",
      cpfCnpj: "12345678901",
      mobilePhone: "11987654321",
      postalCode: "01310-100",
      addressNumber: "123",
    });
    console.log("Customer created:", customer.id);

    // 2. Create a subscription
    console.log("\nCreating subscription...");
    const subscription = await client.subscriptions.create({
      customer: customer.id,
      billingType: AsaasBillingType.CREDIT_CARD,
      value: 99.9,
      cycle: AsaasSubscriptionCycle.MONTHLY,
      nextDueDate: "2025-11-01",
      description: "Monthly subscription",
    });
    console.log("Subscription created:", subscription.id);

    // 3. List subscriptions
    console.log("\nListing subscriptions...");
    const subscriptions = await client.subscriptions.list(customer.id);
    console.log("Found subscriptions:", subscriptions.length);

    // 4. Create a one-time payment
    console.log("\nCreating payment...");
    const payment = await client.payments.create({
      customer: customer.id,
      billingType: AsaasBillingType.BOLETO,
      value: 199.9,
      dueDate: "2025-11-15",
      description: "One-time payment",
    });
    console.log("Payment created:", payment.id);

    // 5. Get PIX QR Code for the payment (if PIX)
    // Uncomment if you want to test PIX
    /*
    const pixPayment = await client.payments.create({
      customer: customer.id,
      billingType: AsaasBillingType.PIX,
      value: 50.00,
      dueDate: '2025-11-15',
    });
    const pixQrCode = await client.payments.getPixQrCode(pixPayment.id);
    console.log('PIX QR Code:', pixQrCode.payload);
    */

    // 6. List payments
    console.log("\nListing payments...");
    const payments = await client.payments.list(customer.id, { limit: 10 });
    console.log("Found payments:", payments.length);

    // 7. Get latest payment
    console.log("\nGetting latest payment...");
    const latestPayment = await client.payments.getLatest(customer.id);
    console.log("Latest payment:", latestPayment?.id);

    // 8. Update customer
    console.log("\nUpdating customer...");
    const updatedCustomer = await client.customers.update(customer.id, {
      name: "John Doe Updated",
    });
    console.log("Customer updated:", updatedCustomer.name);

    // 9. Create a sub-account (if you have permission)
    console.log("\nCreating sub-account...");
    try {
      const subAccount = await client.accounts.createSubAccount({
        name: "Partner Store",
        email: "partner@store.com",
        cpfCnpj: "12345678000199",
        mobilePhone: "11987654321",
        address: "Main Street",
        addressNumber: "123",
        province: "Downtown",
        postalCode: "01310-100",
        incomeValue: 10000,
      });
      console.log("Sub-account created:", subAccount.id);
    } catch (error) {
      console.error("Failed to create sub-account:", error);
    }

    console.log("\n✅ All operations completed successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example
main().catch(console.error);
