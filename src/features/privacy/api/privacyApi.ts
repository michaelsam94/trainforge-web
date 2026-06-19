import { apiClient } from "@/shared/lib/apiClient";

export async function deleteAccount(): Promise<void> {
  await apiClient.delete<void>("/auth/account");
}
