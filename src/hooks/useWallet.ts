import { useEffect, useState } from "react";

import { transactionService } from "../services/transactionService";
import { appToast } from "../utils/toast";

export function useWallet() {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function loadWallet() {
    setIsLoading(true);

    try {
      const data = await transactionService.getWallet();
      setBalance(data.balance);
    } catch {
      appToast.error("Erro ao carregar carteira.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadWallet();
  }, []);

  return {
    balance,
    isLoading,
  };
}