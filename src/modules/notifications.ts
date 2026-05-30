/**
 * Notification module for Asaas SDK
 */

import { AxiosInstance } from "axios";
import {
  AsaasNotification,
  AsaasNotificationUpdateRequest,
} from "../types/index.ts";

export class NotificationsModule {
  constructor(private client: AxiosInstance) {}

  /**
   * Update a notification
   * @param id The notification ID
   * @param data The notification data to update
   * @returns The updated notification
   */
  async update(
    id: string,
    data: AsaasNotificationUpdateRequest
  ): Promise<AsaasNotification> {
    const response = await this.client.put<AsaasNotification>(
      `/notifications/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Update notifications in batch
   * @param data Array of notification updates
   * @returns The updated notifications
   */
  async batchUpdate(
    data: Array<AsaasNotificationUpdateRequest & { id: string }>
  ): Promise<AsaasNotification[]> {
    const response = await this.client.put<AsaasNotification[]>(
      "/notifications/batch",
      data
    );
    return response.data;
  }

  /**
   * Retrieve notifications for a customer
   * @param customerId The customer ID
   * @returns Array of notifications
   */
  async listByCustomer(customerId: string): Promise<AsaasNotification[]> {
    const response = await this.client.get<{ data: AsaasNotification[] }>(
      `/customers/${customerId}/notifications`
    );
    return response.data.data;
  }
}
