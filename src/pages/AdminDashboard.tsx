import { Card, DatePicker, Input, InputNumber, Select, Space, Table, Upload, Button } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import type { UploadProps } from "antd";
import type { Transaction } from "../@types/transaction";

import { PageLayout } from "../components/Layout/PageLayout";
import { useAdminTransactions } from "../hooks/useAdminTransactions";
import { formatCurrency, formatDate, formatStatus } from "../utils/formatters";

const columns: ColumnsType<Transaction> = [
  {
    title: "CPF",
    dataIndex: "cpf",
  },
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

export function AdminDashboard() {
  const {
    filters,
    transactions,
    isLoading,
    setFile,
    updateFilter,
    uploadTransactions,
    loadTransactions,
  } = useAdminTransactions();

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    maxCount: 1,
  };

  return (
    <PageLayout title="Admin Dashboard">
      <div className="dashboard-grid">
        <Card title="Upload da planilha" className="dashboard-card">
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Selecionar planilha</Button>
            </Upload>

            <Button
              type="primary"
              loading={isLoading}
              onClick={uploadTransactions}
              block
            >
              Enviar planilha
            </Button>
          </Space>
        </Card>

        <Card title="Filtros do relatório" className="dashboard-card">
          <div className="filters-grid">
            <Input
              placeholder="CPF"
              value={filters.cpf}
              onChange={(event) => updateFilter("cpf", event.target.value)}
            />

            <Input
              placeholder="Produto"
              value={filters.product}
              onChange={(event) => updateFilter("product", event.target.value)}
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

            <InputNumber
              placeholder="Valor mínimo"
              style={{ width: "100%" }}
              onChange={(value) => updateFilter("minAmount", String(value || ""))}
            />

            <InputNumber
              placeholder="Valor máximo"
              style={{ width: "100%" }}
              onChange={(value) => updateFilter("maxAmount", String(value || ""))}
            />

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
      </div>

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