import React from "react";
import { Col, Layout as AntdLayout, Row, Space, theme, Typography } from "antd";

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
                <img alt="" src="/assets/WS-Logo.svg" />
              </AntdLayout.Header>
              <AntdLayout.Content className="h-0 flex-1">{content}</AntdLayout.Content>
              <AntdLayout.Footer className="p-0">
                <Space className="justify-between w-full" size="large">
                  <Typography.Text type="secondary">
                    2023 <br /> © Work Solutions
                  </Typography.Text>
                  <img alt="" src="/assets/WS-Logo-Copyright.svg" />
                </Space>
              </AntdLayout.Footer>
            </AntdLayout>
          </AntdLayout.Sider>
        </Col>
        <Col
          className="h-full bg-right bg-no-repeat bg-contain"
          flex="auto"
          style={{ backgroundImage: `url("/assets/auth-background-desk.png")` }}
        />
      </Row>
    </AntdLayout>
  );
});
