import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";
import {
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

import type { RegisterPayload } from "../@types/auth";
import { cpfMask } from "../utils/formatters";

import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { appToast } from "../utils/toast";
import {
  validateCPF,
  validateEmail,
  validateFullName,
} from "../utils/validators";

const { Title, Text } = Typography;

const INITIAL_FORM: RegisterPayload = {
  name: "",
  email: "",
  cpf: "",
  password: "",
};

export function Register() {
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState<RegisterPayload>(INITIAL_FORM);

  function updateField(name: keyof RegisterPayload, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    const nameError = validateFullName(form.name);
    const emailError = validateEmail(form.email);
    const cpfError = validateCPF(form.cpf);

    if (nameError) {
      appToast.error(nameError);
      return;
    }

    if (emailError) {
      appToast.error(emailError);
      return;
    }

    if (cpfError) {
      appToast.error(cpfError);
      return;
    }

    if (!form.password) {
      appToast.error("Preencha sua senha.");
      return;
    }

    try {
      await register(form.name, form.email, form.cpf, form.password);
    } catch (error) {
      console.error("Error creating account:", error);
      appToast.error("Error creating account.");
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
            <Title level={2}>Criar conta</Title>
            <Text type="secondary">Cadastre-se para consultar seus pontos</Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Nome" required>
              <Input
                size="large"
                placeholder="Digite seu nome completo"
                prefix={<UserOutlined />}
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </Form.Item>

            <Form.Item label="E-mail" required>
              <Input
                size="large"
                placeholder="maria@exemplo.com"
                prefix={<MailOutlined />}
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </Form.Item>

            <Form.Item label="CPF" required>
              <Input
                size="large"
                placeholder="000.000.000-00"
                prefix={<IdcardOutlined />}
                value={form.cpf}
                onChange={(event) =>
                  updateField("cpf", cpfMask(event.target.value))
                }
              />
            </Form.Item>

            <Form.Item label="Senha" required>
              <Input.Password
                size="large"
                placeholder="Digite sua senha"
                prefix={<LockOutlined />}
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
            >
              Cadastrar
            </Button>
          </Form>

          <div className="auth-footer">
            <Text>Já tem conta?</Text>
            <Link to={ROUTES.LOGIN}>Entrar</Link>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
