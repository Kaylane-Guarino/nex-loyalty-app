import { api } from "./api";
import type {
  AdminTransactionFilters,
  Transaction,
  UploadTransactionsResponse,
  UserTransactionFilters,
  WalletResponse,
} from "../@types/transaction";

export const transactionService = {
  async upload(file: File): Promise<UploadTransactionsResponse> {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post<UploadTransactionsResponse>(
      "/transactions/upload",
      formData
    );

    return response.data;
  },

  async listAdminTransactions(
    filters: AdminTransactionFilters
  ): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>("/transactions/admin", {
      params: filters,
    });

    return response.data;
  },

  async listUserTransactions(
    filters: UserTransactionFilters
  ): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>("/transactions/me", {
      params: filters,
    });

    return response.data;
  },

  async getWallet(): Promise<WalletResponse> {
    const response = await api.get<WalletResponse>("/transactions/wallet");

    return response.data;
  },
};