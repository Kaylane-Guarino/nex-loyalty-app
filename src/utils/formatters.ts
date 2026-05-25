export function formatCurrency(value: string | number): string {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    APPROVED: "Approved",
    REJECTED: "Rejected",
    PENDING: "Pending",
  };

  return statusMap[status] || status;
}

export function cpfMask(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .slice(0, 14);
}