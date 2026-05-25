import { Link } from "react-router-dom";
import { Button, Card, Statistic } from "antd";
import { ArrowLeftOutlined, TrophyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { PageLayout } from "../components/Layout/PageLayout";
import { ROUTES } from "../constants/routes";
import { useWallet } from "../hooks/useWallet";

export function Wallet() {
  const { balance, isLoading } = useWallet();

  return (
    <PageLayout
      title="Carteira"
      actions={
        <Link to={ROUTES.STATEMENT}>
          <Button icon={<ArrowLeftOutlined />}>Extrato</Button>
        </Link>
      }
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Card className="wallet-card">
          <Statistic
            title="Saldo de pontos aprovados"
            value={isLoading ? 0 : balance}
            suffix="pontos"
            prefix={<TrophyOutlined />}
          />
        </Card>
      </motion.div>
    </PageLayout>
  );
}