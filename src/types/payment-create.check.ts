/**
 * Compile-time check, run by `tsc --noEmit`: the create-payment requests
 * Asaas accepts compile, and the ones it refuses do not. Every refusal below
 * was a 400 from the Asaas sandbox (2026-09-27), not a reading of the docs.
 */

import { AsaasBillingType } from "./common.ts";
import type { AsaasPaymentCreateRequest } from "./payment.ts";

const base = {
  customer: "cus_000000000000",
  billingType: AsaasBillingType.CREDIT_CARD,
  dueDate: "2026-10-01",
};

export const accepted: AsaasPaymentCreateRequest[] = [
  { ...base, value: 300 },
  { ...base, installmentCount: 3, totalValue: 300 },
  { ...base, installmentCount: 3, installmentValue: 100 },
  { ...base, installmentCount: 3, installmentValue: 100, totalValue: 300 },
  { ...base, installmentCount: 1, totalValue: 300 },
  { ...base, value: 300, creditCardToken: "tok", remoteIp: "127.0.0.1" },
];

export const refused: AsaasPaymentCreateRequest[] = [
  // 400 invalid_installmentValue: "O valor da parcela deve ser informado."
  // @ts-expect-error value with an installment count
  { ...base, value: 300, installmentCount: 3 },
  // Same 400: a count of 1 is still an installment charge.
  // @ts-expect-error value with an installment count of 1
  { ...base, value: 300, installmentCount: 1 },
  // @ts-expect-error an installment count with no amount
  { ...base, installmentCount: 3 },
  // @ts-expect-error no amount at all
  { ...base },
];
