import React from "react";
import { Link } from "react-router-dom";
import { Col, Layout as AntdLayout, Row, Space, theme, Typography } from "antd";

import { AppRoutes } from "../../../../model/services/appRoutes";

interface AuthLayoutProps {
  content: React.ReactNode;
}

export const DesktopView = React.memo(function DesktopView({ content }: AuthLayoutProps) {
  const { token } = theme.useToken();

  return (
    <AntdLayout className="h-full">
      <Row className="w-full">
        <Col flex="344px">
          <AntdLayout.Sider
            className="h-full"
            style={{ borderRight: `1px solid ${token.colorBorder}`, padding: token.paddingXL }}
            theme="light"
            width="100%"
          >
            <AntdLayout className="h-full">
              <AntdLayout.Header className="p-0">
                <Link to={AppRoutes.getRootUrl()}>
                  <img alt="" src="/assets/WS-Logo.svg" />
                </Link>
              </AntdLayout.Header>
              <AntdLayout.Content className="h-0 flex-1">{content}</AntdLayout.Content>
              <AntdLayout.Footer className="p-0">
                <Space className="justify-between w-full" size="large">
                  <Typography.Text type="secondary">
                    {new Date().getFullYear()} <br /> © Work Solutions
                  </Typography.Text>
                  <img alt="" src="/assets/WS-Logo-Copyright.svg" />
                </Space>
              </AntdLayout.Footer>
            </AntdLayout>
          </AntdLayout.Sider>
        </Col>
        <Col
          className="h-full bg-right bg-no-repeat bg-contain bg-white"
          flex="auto"
          style={{ backgroundImage: `url("/assets/auth-background-desk.png")` }}
        />
      </Row>
    </AntdLayout>
  );
});
