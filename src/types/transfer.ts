/**
 * Transfer types for Asaas SDK
 */

export enum AsaasTransferStatus {
  PENDING = "PENDING",
  BANK_PROCESSING = "BANK_PROCESSING",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum AsaasTransferType {
  PIX = "PIX",
  TED = "TED",
  INTERNAL = "INTERNAL",
}

export enum AsaasPixAddressKeyType {
  CPF = "CPF",
  CNPJ = "CNPJ",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  EVP = "EVP",
}

export enum AsaasBankAccountType {
  CONTA_CORRENTE = "CONTA_CORRENTE",
  CONTA_POUPANCA = "CONTA_POUPANCA",
}

export interface AsaasTransferBankAccount {
  bank?: { code: string };
  accountName?: string;
  ownerName: string;
  cpfCnpj: string;
  agency: string;
  account: string;
  accountDigit: string;
  bankAccountType?: AsaasBankAccountType;
  ispb?: string;
  ownerBirthDate?: string;
}

export interface AsaasTransfer {
  object?: string;
  id: string;
  type: AsaasTransferType;
  dateCreated: string;
  value: number;
  netValue?: number;
  status: AsaasTransferStatus;
  transferFee?: number;
  effectiveDate?: string;
  scheduleDate?: string;
  endToEndIdentifier?: string;
  authorized: boolean;
  failReason?: string;
  externalReference?: string;
  transactionReceiptUrl?: string;
  operationType?: AsaasTransferType;
  description?: string;
  bankAccount?: {
    bank?: { ispb?: string; code?: string; name?: string };
    accountName?: string;
    ownerName?: string;
    cpfCnpj?: string;
    agency?: string;
    agencyDigit?: string;
    account?: string;
    accountDigit?: string;
    pixAddressKey?: string;
  };
}

export interface AsaasTransferCreateRequest {
  value: number;
  bankAccount?: AsaasTransferBankAccount;
  operationType?: AsaasTransferType;
  pixAddressKey?: string;
  pixAddressKeyType?: AsaasPixAddressKeyType;
  description?: string;
  scheduleDate?: string;
  externalReference?: string;
}

export interface AsaasTransferToAsaasRequest {
  value: number;
  walletId: string;
}

export interface AsaasListTransfersParams {
  "dateCreated[ge]"?: string;
  "dateCreated[le]"?: string;
  "transferDate[ge]"?: string;
  "transferDate[le]"?: string;
  type?: string;
}
