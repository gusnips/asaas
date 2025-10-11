/**
 * Account-related types for Asaas SDK (Sub-accounts)
 */

/**
 * Person Type for Asaas Sub-accounts
 */
export enum AsaasPersonType {
  JURIDICA = "JURIDICA",
  FISICA = "FISICA",
}

/**
 * Company Type for Asaas Sub-accounts
 */
export enum AsaasCompanyType {
  MEI = "MEI",
  LIMITED = "LIMITED",
  INDIVIDUAL = "INDIVIDUAL",
  ASSOCIATION = "ASSOCIATION",
}

/**
 * Sub-account request interface
 */
export interface AsaasSubAccountRequest {
  name: string;
  email: string;
  loginEmail?: string;
  cpfCnpj: string;
  birthDate?: string; // Format: YYYY-MM-DD, required for FISICA
  companyType?: AsaasCompanyType; // Required for JURIDICA
  phone?: string;
  mobilePhone: string;
  site?: string;
  incomeValue: number;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
}

/**
 * Sub-account response interface
 */
export interface AsaasSubAccount {
  object: string;
  id: string;
  name: string;
  email: string;
  loginEmail?: string;
  phone?: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  birthDate?: string;
  personType: AsaasPersonType;
  companyType?: AsaasCompanyType;
  city: number;
  state: string;
  country: string;
  tradingName?: string;
  site?: string;
  walletId: string;
  accountNumber: {
    agency: string;
    account: string;
    accountDigit: string;
  };
  commercialInfoExpiration?: {
    isExpired: boolean;
    scheduledDate?: string;
  };
  apiKey?: string; // Only returned on creation
}

/**
 * Sub-account update request interface
 */
export interface AsaasSubAccountUpdateRequest {
  name?: string;
  email?: string;
  loginEmail?: string;
  birthDate?: string;
  companyType?: AsaasCompanyType;
  phone?: string;
  mobilePhone?: string;
  site?: string;
  incomeValue?: number;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
}

/**
 * Wallet information from Asaas
 */
export interface AsaasWallet {
  object: string;
  id: string;
}

/**
 * Wallets response from Asaas
 */
export interface AsaasWalletsResponse {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: AsaasWallet[];
}

/**
 * Commercial info status from Asaas
 */
export enum AsaasCommercialInfoStatus {
  APPROVED = "APPROVED",
  AWAITING_ACTION_AUTHORIZATION = "AWAITING_ACTION_AUTHORIZATION",
  DENIED = "DENIED",
  PENDING = "PENDING",
}

/**
 * City information from Asaas
 */
export interface AsaasCity {
  object: string;
  id: number;
  ibgeCode: string;
  name: string;
  districtCode: string;
  district: string;
  state: string;
}

/**
 * Commercial info expiration from Asaas
 */
export interface AsaasCommercialInfoExpiration {
  isExpired: boolean;
  scheduledDate: string;
}

/**
 * Commercial info from Asaas
 */
export interface AsaasCommercialInfo {
  status: AsaasCommercialInfoStatus;
  personType: AsaasPersonType;
  cpfCnpj: string;
  name: string;
  birthDate?: string;
  companyName?: string;
  companyType?: AsaasCompanyType;
  incomeValue: number;
  email: string;
  phone?: string;
  mobilePhone?: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  city: AsaasCity;
  denialReason?: string;
  tradingName?: string;
  site?: string;
  availableCompanyNames?: string[];
  commercialInfoExpiration?: AsaasCommercialInfoExpiration;
}
