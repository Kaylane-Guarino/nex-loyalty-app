import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import { App } from "./App";

import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#111827",
          borderRadius: 10,
          fontFamily: "Inter, Arial, sans-serif",
        },
      }}
    >
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </ConfigProvider>
  </React.StrictMode>
);