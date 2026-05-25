import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { appToast } from "../utils/toast";

const { Title, Text } = Typography;

export function Login() {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      await login(email, password);
    } catch {
      appToast.error("E-mail ou senha inválidos.");
    }
  }

  return (
    <main className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="auth-container"
      >
        <Card className="auth-card">
          <div className="auth-header">
            <Title level={2}>Nex Loyalty</Title>
            <Text type="secondary">Entre para acessar sua carteira de pontos</Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="E-mail" required>
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>

            <Form.Item label="Senha" required>
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
            >
              Entrar
            </Button>
          </Form>

          <div className="auth-footer">
            <Text>Ainda não tem conta?</Text>
            <Link to={ROUTES.REGISTER}>Criar conta</Link>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}