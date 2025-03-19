import React from "react";
import { BreakpointProvider, theme } from "@worksolutions/antd-react-components";
import { App as AntdApp, ConfigProvider } from "antd";

import type { AppProvider } from "../types";
import { antdServices } from "@frontend/shared/model/services";

const AntdServicesInitializer = React.memo(function AppServicesInitializer() {
  const staticFunction = AntdApp.useApp();

  antdServices.setMessageInstance(staticFunction.message);
  antdServices.setNotificationInstance(staticFunction.notification);
  antdServices.setModalInstance(staticFunction.modal);
  return null;
});

export const withAntD: AppProvider = App =>
  function AntDProvider() {
    return (
      <ConfigProvider theme={theme}>
        <BreakpointProvider>
          <AntdApp>
            <AntdServicesInitializer />
            <App />
          </AntdApp>
        </BreakpointProvider>
      </ConfigProvider>
    );
  };
