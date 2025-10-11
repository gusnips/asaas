/**
 * Customer-related types for Asaas SDK
 */

/**
 * Customer entity structure
 *
 * The minimum required fields for creating a customer are `name` and `email`.
 * If the customer is Brazilian, `cpfCnpj` should also be provided.
 *
 * Note: If you provide `postalCode`, Asaas will automatically populate `city`,
 * `province` and `address` attributes. In this case, you only need to provide
 * `postalCode` and `addressNumber`.
 *
 * The `city` field returns an identifier. To get city details, use:
 * GET https://api.asaas.com/v3/cities/{city_id}
 */
export interface AsaasCustomer {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  mobilePhone?: string;
  phone?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
  externalReference?: string;
  notificationDisabled?: boolean;
  additionalEmails?: string;
  municipalInscription?: string;
  stateInscription?: string;
  observations?: string;
  groupName?: string;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
  dateCreated?: string;
  deleted?: boolean;
}
