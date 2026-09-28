# Installment purchases

An installment purchase is one purchase split into several payments. You can create one through
`client.payments` or `client.installments`, but the two endpoints use different amount names.

> The linked Asaas pages describe the public API. Text marked **Measured** was observed in the
> Asaas sandbox on 2026-09-27. It is evidence, not an API promise. Keep an integration check if
> your money logic depends on measured behavior.

## Choose the amount field for the endpoint

| Endpoint             | SDK method                     | Whole purchase                    | Each installment                        |
| -------------------- | ------------------------------ | --------------------------------- | --------------------------------------- |
| `POST /payments`     | `client.payments.create()`     | `totalValue` + `installmentCount` | `installmentValue` + `installmentCount` |
| `POST /installments` | `client.installments.create()` | `totalValue`                      | `value`                                 |

For [`POST /payments`](https://docs.asaas.com/reference/create-new-payment), `value` means one
payment. Use `totalValue` with `installmentCount` when one purchase has several payments:

```typescript
import { AsaasBillingType } from "@gusnips/asaas";

const payment = await client.payments.create({
  customer: "cus_xxx",
  billingType: AsaasBillingType.PIX,
  dueDate: "2026-10-01",
  installmentCount: 3,
  totalValue: 100,
  externalReference: "order-123",
});
```

**Measured:** Asaas rejected `value + installmentCount` with HTTP 400 and
`invalid_installmentValue`, even when the count was `1`. The endpoint also accepts
`installmentValue`, but that field sets each payment separately: `33.33` three times makes a
`99.99` purchase. Prefer `totalValue` when you know the purchase total. If you send both
`totalValue` and `installmentValue`, Asaas uses `totalValue`.

For [`POST /installments`](https://docs.asaas.com/reference/create-installment), `value` has a
different meaning: it is one installment. `totalValue` is the whole purchase.

```typescript
const installment = await client.installments.create({
  customer: "cus_xxx",
  billingType: AsaasBillingType.BOLETO,
  dueDate: "2026-10-01",
  installmentCount: 3,
  totalValue: 100,
  paymentExternalReference: "order-123",
});
```

**Measured:** this endpoint accepted either `totalValue` or `value`. If both were present,
`totalValue` won and `value` was ignored. A request with neither returned HTTP 400 and
`invalid_installmentValue`.

Notice the reference field names too: `/payments` takes `externalReference`, while
`/installments` takes `paymentExternalReference` for the payments it creates.

## Split values

The request field is `split` on `client.payments.create()` and `splits` on
`client.installments.create()`. The amount field changes what each destination wallet receives:

| Field             | Meaning for an installment purchase                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `fixedValue`      | This amount is paid on every installment. A value of `10` on three installments pays `30` in total.                     |
| `totalFixedValue` | This is the amount for the whole purchase. Asaas divides it across the installments.                                    |
| `percentualValue` | This percentage follows each installment's net amount. It is not a percentage of the original purchase total paid once. |

The [official split guide](https://docs.asaas.com/docs/split-into-installments) documents the
`fixedValue` and `totalFixedValue` distinction. The
[`POST /installments` reference](https://docs.asaas.com/reference/create-installment) defines
`percentualValue` against the charge's net value.

**Measured:** on an installment purchase, `percentualValue` was calculated from each payment's
`netValue`. The split amount can therefore differ between installments when their net amounts
differ.

To divide one fixed split total across the purchase:

```typescript
await client.installments.create({
  customer: "cus_xxx",
  billingType: AsaasBillingType.BOLETO,
  dueDate: "2026-10-01",
  installmentCount: 3,
  totalValue: 300,
  splits: [{ walletId: "wal_xxx", totalFixedValue: 30 }],
});
```

Use `client.installments.create()` when a split must target one installment with
`installmentNumber`. **Measured:** `POST /payments` ignored `installmentNumber` without returning
an error.

## Remainder cents and list order

Asaas puts a division remainder on the last installment by `installmentNumber`. For example,
`100` split into three payments becomes:

1. `33.33`
2. `33.33`
3. `33.34`

The [`POST /payments` reference](https://docs.asaas.com/reference/create-new-payment) documents a
final-installment adjustment. **Measured:** the same result occurred through both `/payments` and
`/installments`.

Do not use the array position as the installment order. The API docs do not promise a list order,
and **measured** Asaas responses listed the highest `installmentNumber` first. Sort the payments
before using their order:

```typescript
const page = await client.installments.listPayments(installment.id);
const inScheduleOrder = [...page.data].sort(
  (left, right) =>
    (left.installmentNumber ?? Number.MAX_SAFE_INTEGER) -
    (right.installmentNumber ?? Number.MAX_SAFE_INTEGER),
);
```

The last array item is only the last installment after this sort.

## Purchase identity

Each installment has its own `payment.id`. All payments in the purchase belong to the same
`payment.installment` ID. A payment that is not part of an installment purchase has no
`payment.installment`.

Use this key when an effect must happen once per purchase:

```typescript
import type { AsaasPayment } from "@gusnips/asaas";

function purchaseId(payment: AsaasPayment): string {
  return payment.installment ?? payment.id;
}
```

Use `payment.id` instead when the effect belongs to one installment only.

The [official installment guide](https://docs.asaas.com/docs/installments) says each installment
has its own payment ID and that payment webhooks include the installment ID. **Measured:** every
payment in one purchase returned the same `installment` ID and the same `externalReference`. The
API docs describe `externalReference` as your own reference, but do not promise that Asaas enforces
its uniqueness. Enforce that rule in your system if you depend on it.

## Webhooks and idempotency

Asaas [documents](https://docs.asaas.com/docs/installments) one `PAYMENT_CREATED` event for
each installment. [Later status changes](https://docs.asaas.com/docs/payment-events) also produce
payment events, and each event carries one payment. One purchase can therefore have several
distinct event IDs; they are not webhook retries.

The [official webhook idempotency guide](https://docs.asaas.com/docs/how-to-implement-idempotence-in-webhooks)
says delivery is at least once. Store the top-level webhook event `id` under a unique constraint
before returning HTTP 200. A repeated event keeps the same ID, so it must not repeat its side
effect. Asaas does not promise universal webhook order, so do not use arrival order as installment
order.

Webhook deduplication and purchase deduplication solve different problems:

- Use the webhook event `id` to ignore a retry of the same event.
- Use `payment.installment ?? payment.id` to run a purchase-level grant or reversal once across
  different installment events.
- Use `payment.id` for work that belongs to one installment.

Decide what one reversed installment means for your product. You might reverse only that payment's
effect, or treat it as a reversal of the whole purchase. The SDK exposes the payment and purchase
IDs; it does not choose this policy.

## Subscriptions are different

A subscription creates payments over time. It is not one installment purchase.

The official docs say [`INACTIVE`](https://docs.asaas.com/reference/update-existing-subscription)
stops new charges until you reactivate the subscription, while
[`DELETE`](https://docs.asaas.com/reference/remove-subscription) permanently stops future billing
and removes pending or overdue charges.

**Measured:** deleting the same subscription again succeeded, and
[`retrieve()`](https://docs.asaas.com/reference/retrieve-a-single-subscription) still returned HTTP
200 with `deleted: true`. An `INACTIVE` subscription retained its pending charge and could be
reactivated. The official docs do not promise those three details, so do not use them as your only
recovery plan.
