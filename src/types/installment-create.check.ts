/**
 * Compile-time check, run by `tsc --noEmit`: the create-installment requests
 * Asaas accepts compile, and the ones it refuses do not. Every case below was
 * sent to the Asaas sandbox (2026-09-27), not read from the docs.
 */

import { AsaasBillingType } from "./common.ts";
import type { AsaasInstallmentCreateRequest } from "./installment.ts";

const base = {
  customer: "cus_000000000000",
  billingType: AsaasBillingType.CREDIT_CARD,
  dueDate: "2026-10-01",
  installmentCount: 3,
};

export const accepted: AsaasInstallmentCreateRequest[] = [
  { ...base, totalValue: 300 },
  { ...base, value: 100 },
  // Accepted, but `value` is ignored: the total decides every installment.
  { ...base, value: 100, totalValue: 300 },
  { ...base, totalValue: 300, creditCardToken: "tok", remoteIp: "127.0.0.1" },
];

export const refused: AsaasInstallmentCreateRequest[] = [
  // 400 invalid_installmentValue: "O valor da parcela deve ser informado."
  // @ts-expect-error no amount at all
  { ...base },
  // 400 invalid_object: "Informe o número de parcelas."
  // @ts-expect-error no installment count
  { customer: base.customer, billingType: base.billingType, dueDate: base.dueDate, value: 100 },
];
