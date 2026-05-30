/**
 * Invoice (Nota Fiscal) types for Asaas SDK
 */

export enum AsaasNfStatus {
  SCHEDULED = "SCHEDULED",
  AUTHORIZED = "AUTHORIZED",
  PROCESSING_CANCELLATION = "PROCESSING_CANCELLATION",
  CANCELED = "CANCELED",
  CANCELLATION_DENIED = "CANCELLATION_DENIED",
  ERROR = "ERROR",
}

export interface AsaasInvoiceTaxes {
  retainIss: boolean;
  iss: number;
  pis: number;
  cofins: number;
  csll: number;
  inss: number;
  ir: number;
  nbsCode?: string;
  taxSituationCode?: string;
  taxClassificationCode?: string;
  operationIndicatorCode?: string;
  pisCofinsRetentionType?: string;
  pisCofinsTaxStatus?: string;
}

export interface AsaasInvoice {
  object?: string;
  id: string;
  status: AsaasNfStatus;
  customer?: string;
  payment?: string;
  installment?: string;
  type?: string;
  statusDescription?: string;
  serviceDescription: string;
  pdfUrl?: string;
  xmlUrl?: string;
  rpsSerie?: string;
  rpsNumber?: string;
  number?: string;
  validationCode?: string;
  value: number;
  deductions?: number;
  effectiveDate: string;
  observations?: string;
  estimatedTaxesDescription?: string;
  externalReference?: string;
  taxes?: AsaasInvoiceTaxes;
  municipalServiceId?: string;
  municipalServiceCode?: string;
  municipalServiceName?: string;
}
