import type { ReactNode } from "react";
import { Button, Layout, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { useAuth } from "../../hooks/useAuth";

const { Header, Content } = Layout;
const { Title } = Typography;

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function PageLayout({ title, children, actions }: PageLayoutProps) {
  const { logout } = useAuth();

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <Title level={3} className="app-title">
          {title}
        </Title>

        <div className="app-actions">
          {actions}

          <Button icon={<LogoutOutlined />} onClick={logout}>
            Sair
          </Button>
        </div>
      </Header>

      <Content className="app-content">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Content>
    </Layout>
  );
}