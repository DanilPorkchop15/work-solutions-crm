import React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useTitle } from "react-use";
import { HomeOutlined, MailOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Result, Space, Typography } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { useTheme } from "../../../shared/ui/theme/index";

function NotFoundPage() {
  useTitle(AppTitles.getNotFoundTitle());

  const { theme } = useTheme();

  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-[#333333]" : "bg-gradient-to-r from-gray-100 to-blue-200"}`}
    >
      <Card className="w-full max-w-2xl shadow-lg rounded-lg" bodyStyle={{ padding: 40 }}>
        <Result
          status="404"
          title="404 - Страница не найдена"
          subTitle="Извините, страница, которую вы посетили, не существует."
          extra={
            <Space direction="vertical" size="large">
              <Space>
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={() => navigate(AppRoutes.getRootUrl())}
                  size="large"
                >
                  На главную
                </Button>
                <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()} size="large">
                  Обновить
                </Button>
              </Space>
            </Space>
          }
        />
      </Card>
    </div>
  );
}

export const Component = React.memo(NotFoundPage);
