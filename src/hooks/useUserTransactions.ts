import { useEffect, useState } from "react";

import type {
  Transaction,
  UserTransactionFilters,
} from "../@types/transaction";

import { transactionService } from "../services/transactionService";
import { appToast } from "../utils/toast";

const INITIAL_FILTERS: UserTransactionFilters = {
  status: "",
  startDate: "",
  endDate: "",
};

export function useUserTransactions() {
  const [filters, setFilters] =
    useState<UserTransactionFilters>(INITIAL_FILTERS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function updateFilter(name: keyof UserTransactionFilters, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  async function loadTransactions() {
    setIsLoading(true);

    try {
      const data = await transactionService.listUserTransactions(filters);
      setTransactions(data);
    } catch {
      appToast.error("Erro ao carregar extrato.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    filters,
    transactions,
    isLoading,
    updateFilter,
    loadTransactions,
  };
}