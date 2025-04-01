import React from "react";
import { Col, ConfigProvider, Layout, Row, theme as antdTheme, type ThemeConfig } from "antd";

const theme: ThemeConfig = {
  components: {
    Layout: {
      bodyBg: "#F2F2F2",
      headerBg: "#F2F2F2",
      footerBg: "#F2F2F2",
      siderBg: "#F2F2F2"
    },
    Tooltip: {
      colorBgSpotlight: "#F2F2F2",
      colorTextLightSolid: "rgb(70, 70, 70)"
    }
  },
  token: {
    colorTextDisabled: "#D9D9D9"
  }
};

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
}

export const MainLayout = React.memo(function MainLayout({ sidebar, header, content }: MainLayoutProps) {
  const { token } = antdTheme.useToken();

  return (
    <ConfigProvider theme={theme}>
      <Layout className="h-full w-full block">
        <Row className="w-full h-full flex-nowrap">
          {sidebar}
          <Col className="flex flex-col w-0 flex-1">
            {header}
            <Layout className="w-full h-0 flex-1 overflow-auto" style={{ padding: token.paddingMD }}>
              {content}
            </Layout>
          </Col>
        </Row>
      </Layout>
    </ConfigProvider>
  );
});
