import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useTitle } from "react-use";
import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Card, Result, Space } from "antd";

import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { AppTitles } from "../../../../shared/model/services/appTitles";
import { useTheme } from "../../../../shared/ui/theme";

function ForbiddenPage() {
  useTitle(AppTitles.getForbiddenTitle());

  const { theme } = useTheme();

  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${theme === "dark" ? "bg-[#333333]" : "bg-gradient-to-r from-gray-100 to-blue-200"}`}
    >
      <Card className="w-full max-w-2xl shadow-lg rounded-lg" bodyStyle={{ padding: 40 }}>
        <Result
          status="403"
          title="403 - Доступ запрещен"
          subTitle="Извините, у вас нет доступа к этой странице."
          extra={
            <Space direction="vertical" size="large">
              <Space>
                <Button icon={<LeftOutlined />} onClick={() => navigate(-1)} size="large">
                  Назад
                </Button>
                <Button
                  type="primary"
                  icon={<HomeOutlined />}
                  onClick={() => navigate(AppRoutes.getRootUrl())}
                  size="large"
                >
                  На главную
                </Button>
              </Space>
            </Space>
          }
        />
      </Card>
    </div>
  );
}

export const Component = React.memo(ForbiddenPage);
