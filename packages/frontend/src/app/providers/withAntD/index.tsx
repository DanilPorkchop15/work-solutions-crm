import React from "react";
import { antdServices } from "@frontend/shared/model/services";
import { ThemeProvider, useTheme } from "@frontend/shared/ui/theme";
import { darkTheme } from "@frontend/shared/ui/theme/config";
import { BreakpointProvider, theme } from "@worksolutions/antd-react-components";
import { App as AntdApp, ConfigProvider } from "antd";

import type { AppProvider } from "../types";

const AntdServicesInitializer = React.memo(function AppServicesInitializer() {
  const staticFunction = AntdApp.useApp();

  antdServices.setMessageInstance(staticFunction.message);
  antdServices.setNotificationInstance(staticFunction.notification);
  antdServices.setModalInstance(staticFunction.modal);
  return null;
});

function AntDProvider({ App }: { App: React.FC }) {
  const { theme: algorithm } = useTheme();

  return (
    <ConfigProvider theme={algorithm === "dark" ? darkTheme : theme}>
      <BreakpointProvider>
        <AntdApp>
          <AntdServicesInitializer />
          <App />
        </AntdApp>
      </BreakpointProvider>
    </ConfigProvider>
  );
}

export const withAntD: AppProvider = App =>
  function AppWithAntD() {
    return (
      <ThemeProvider>
        <AntDProvider App={App} />
      </ThemeProvider>
    );
  };
