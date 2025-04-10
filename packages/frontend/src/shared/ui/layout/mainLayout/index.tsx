import React from "react";
import { useTheme } from "@frontend/shared/ui/theme";
import { darkTheme } from "@frontend/shared/ui/theme/config";
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
    },
    Input: {
      colorTextPlaceholder: "#CCCCCC"
    },
    Select: {
      colorBorder: "#d9d9d9"
    }
  },
  token: {
    colorTextDisabled: "#D1D1D1",
    colorBgBase: "#FFFFFF"
  }
};

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
}

export const MainLayout = React.memo(function MainLayout({ sidebar, header, content }: MainLayoutProps) {
  const { token } = antdTheme.useToken();

  const { theme: algorithm } = useTheme();

  return (
    <ConfigProvider theme={algorithm === "dark" ? darkTheme : theme}>
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
