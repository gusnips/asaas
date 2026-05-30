# Changelog

## [2.0.0] - 2026-05-30

### Breaking Changes

- **Payments**: `list()` now returns `AsaasApiPaginatedResponse<AsaasPayment>` instead of `AsaasPayment[]`. Access data via `.data`.
- **Customers**: `list()` now returns `AsaasApiPaginatedResponse<AsaasCustomer>` instead of `AsaasCustomer[]`.
- **Subscriptions**: `list()` now returns `AsaasApiPaginatedResponse<AsaasSubscription>` instead of `AsaasSubscription[]`.
- **Payments**: `update()` now uses PUT instead of POST (aligns with official API).
- **Customers**: `update()` now uses PUT instead of POST.
- **Subscriptions**: `update()` now uses PUT instead of POST.
- **Payments**: Removed app-specific methods: `createProrated`, `cancelOpenInvoices`, `getOverdue`, `getLatest`, `listAllOverdue`, `cancel`. Use `delete()` and `list()` with filters instead.
- **Payments**: `getBoleto()` renamed to `getIdentificationField()`.
- **Payments**: `create()` now accepts `AsaasPaymentCreateRequest` instead of `Partial<AsaasPayment>`.
- **Customers**: `create()` now accepts `AsaasCustomerCreateRequest` instead of `Partial<AsaasCustomer>`.
- **Subscriptions**: Removed `reactivate()` and `cancel()` methods. Use `update()` to change status or `delete()` to remove.
- **Payments**: `tokenizeCreditCard()` endpoint corrected to `/creditCard/tokenizeCreditCard`.
- **Payments**: `list()` no longer requires `customerId` as first argument. Use `params.customer` filter instead.

### New Modules

- **Installments** (`client.installments`) — Create, retrieve, list, delete, refund, list payments, get payment book.
- **Payment Links** (`client.paymentLinks`) — Full CRUD, restore, list with filters.
- **Webhooks** (`client.webhooks`) — Full CRUD, list, remove backoff.
- **Transfers** (`client.transfers`) — Bank/PIX/internal transfers, list, cancel.
- **PIX** (`client.pix`) — Address keys, static QR codes, decode/pay QR codes, transactions.
- **Finance** (`client.finance`) — Account balance, financial extract, payment/split statistics.
- **Anticipations** (`client.anticipations`) — Request, simulate, cancel, list, get limits.
- **Invoices** (`client.invoices`) — Schedule, authorize, cancel, update, list NFS-e.
- **Bills** (`client.bills`) — Pay bills (boletos de terceiros), simulate, cancel.
- **Payment Dunnings** (`client.paymentDunnings`) — Debt recovery via Serasa.
- **Notifications** (`client.notifications`) — Update notification settings.
- **Mobile Phone Recharges** (`client.mobilePhoneRecharges`) — Cell phone top-ups.

### New Payment Methods

- `refund(id, value?, description?)` — Full or partial refund.
- `restore(id)` — Restore a removed payment.
- `getStatus(id)` — Get payment status.
- `capturePreAuthorized(id)` — Capture pre-authorized payment.
- `payWithCreditCard(id, data)` — Pay a charge with credit card.
- `receiveInCash(id, date, value)` — Confirm cash receipt.
- `undoReceivedInCash(id)` — Undo cash receipt.
- `simulate(data)` — Sales simulator.
- `getLimits()` — Get payment limits.
- `getRefunds(id)` — Get refunds for a payment.
- `getViewingInfo(id)` — Get viewing info.

### New Customer Methods

- `restore(id)` — Restore a removed customer.

### New Subscription Methods

- `listPayments(id, params)` — List payments of a subscription.
- `updateCreditCard(id, data)` — Update credit card without charging.
- `getPaymentBook(id)` — Generate payment booklet.

### Improvements

- All types updated to match official Asaas API v3 schemas.
- Added `AsaasPaymentStatus.DUNNING_REQUESTED`, `DUNNING_RECEIVED`, `AWAITING_RISK_ANALYSIS`.
- Added `AsaasSubscriptionStatus.EXPIRED`.
- Added `AsaasFineType` enum.
- Customer type now includes `personType`, `cityName`, `foreignCustomer`.
- Full filter support on all list methods (date ranges, status, billing type, etc.).
- Proper typed request interfaces for all create/update operations.

## [1.0.1] - 2024-12-01

- Initial release with Customers, Payments, Subscriptions, and Accounts modules.
