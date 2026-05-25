import { Link } from "react-router-dom";
import { Button, Card, DatePicker, Select, Table } from "antd";
import { WalletOutlined, SearchOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import type { Transaction } from "../@types/transaction";

import { PageLayout } from "../components/Layout/PageLayout";
import { ROUTES } from "../constants/routes";
import { useUserTransactions } from "../hooks/useUserTransactions";
import { formatCurrency, formatDate, formatStatus } from "../utils/formatters";

const columns: ColumnsType<Transaction> = [
  {
    title: "Descrição",
    dataIndex: "description",
  },
  {
    title: "Data",
    dataIndex: "transactionDate",
    render: (value: string) => formatDate(value),
  },
  {
    title: "Pontos",
    dataIndex: "points",
  },
  {
    title: "Valor",
    dataIndex: "amount",
    render: (value: string) => formatCurrency(value),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (value: string) => formatStatus(value),
  },
];

export function UserStatement() {
  const {
    filters,
    transactions,
    isLoading,
    updateFilter,
    loadTransactions,
  } = useUserTransactions();

  return (
    <PageLayout
      title="Meu Extrato"
      actions={
        <Link to={ROUTES.WALLET}>
          <Button icon={<WalletOutlined />}>Carteira</Button>
        </Link>
      }
    >
      <Card title="Filtros" className="dashboard-card">
        <div className="filters-grid user-filters">
          <Select
            placeholder="Status"
            allowClear
            value={filters.status || undefined}
            onChange={(value) => updateFilter("status", value || "")}
            options={[
              { label: "Aprovado", value: "APPROVED" },
              { label: "Reprovado", value: "REJECTED" },
              { label: "Em avaliação", value: "PENDING" },
            ]}
          />

          <DatePicker
            placeholder="Data inicial"
            style={{ width: "100%" }}
            onChange={(_, dateString) =>
              updateFilter("startDate", String(dateString))
            }
          />

          <DatePicker
            placeholder="Data final"
            style={{ width: "100%" }}
            onChange={(_, dateString) =>
              updateFilter("endDate", String(dateString))
            }
          />
        </div>

        <Button
          type="primary"
          icon={<SearchOutlined />}
          loading={isLoading}
          onClick={loadTransactions}
          style={{ marginTop: 16 }}
        >
          Buscar
        </Button>
      </Card>

      <Card title="Transações">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={transactions}
          loading={isLoading}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </PageLayout>
  );
}