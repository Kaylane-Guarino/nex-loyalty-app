import { useState } from "react";

import type {
  AdminTransactionFilters,
  Transaction,
} from "../@types/transaction";

import { transactionService } from "../services/transactionService";
import { appToast } from "../utils/toast";

const INITIAL_FILTERS: AdminTransactionFilters = {
  cpf: "",
  product: "",
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
  status: "",
};

export function useAdminTransactions() {
  const [file, setFile] = useState<File | null>(null);
  const [filters, setFilters] =
    useState<AdminTransactionFilters>(INITIAL_FILTERS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function updateFilter(name: keyof AdminTransactionFilters, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  async function uploadTransactions() {
    if (!file) {
      appToast.error("Selecione uma planilha primeiro.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await transactionService.upload(file);

      appToast.success(
        `Upload concluído. Criadas: ${result.created}. Ignoradas: ${result.ignored}.`
      );

      await loadTransactions();
    } catch {
      appToast.error("Erro ao enviar planilha.");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadTransactions() {
    setIsLoading(true);

    try {
      const data = await transactionService.listAdminTransactions(filters);
      setTransactions(data);
    } catch {
      appToast.error("Erro ao carregar transações.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    file,
    filters,
    transactions,
    isLoading,
    setFile,
    updateFilter,
    uploadTransactions,
    loadTransactions,
  };
}