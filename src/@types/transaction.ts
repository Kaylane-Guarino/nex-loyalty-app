export type TransactionStatus = "APPROVED" | "REJECTED" | "PENDING";

export interface Transaction {
  id: number;
  cpf: string;
  description: string;
  transactionDate: string;
  points: number;
  amount: string;
  status: TransactionStatus;
}

export interface AdminTransactionFilters {
  cpf: string;
  product: string;
  startDate: string;
  endDate: string;
  minAmount: string;
  maxAmount: string;
  status: string;
}

export interface UserTransactionFilters {
  status: string;
  startDate: string;
  endDate: string;
}

export interface UploadTransactionsResponse {
  message: string;
  created: number;
  ignored: number;
}

export interface WalletResponse {
  balance: number;
}