# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-11

### Added

- Initial release of Asaas SDK
- Domain-based architecture with clean separation of concerns
- Full TypeScript support with comprehensive type definitions
- Customer management module
  - Create, retrieve, and update customers
- Subscription management module
  - Create, retrieve, list, update, reactivate, and cancel subscriptions
- Payment management module
  - Create, retrieve, update, and list payments
  - Get latest and overdue payments
  - Get billing info, boleto, and PIX QR codes
  - Credit card tokenization
  - Payment link creation
  - Prorated payment creation
  - Cancel payments and open invoices
- Account management module (Sub-accounts)
  - Create, retrieve, update, and list sub-accounts
  - Get wallets and commercial information
- Support for both production and sandbox environments
- Comprehensive error handling with AsaasApiError
- Full ESLint configuration with TypeScript rules
- Complete README documentation with all methods
