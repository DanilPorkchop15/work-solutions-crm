import React from "react";
import { Layout as AntdLayout, theme, Typography } from "antd";
import cn from "classnames";

import styles from "./index.module.scss";

interface AuthLayoutProps {
  content: React.ReactNode;
}

export const MobileView = React.memo(function MobileView({ content }: AuthLayoutProps) {
  const { token } = theme.useToken();

  return (
    <AntdLayout
      className="h-full bg-right-top bg-no-repeat bg-contain"
      style={{ backgroundImage: `url("/assets/auth-background-mobile.png")` }}
    >
      <AntdLayout.Header className="h-auto" style={{ paddingTop: token.paddingLG }}>
        <img alt="" src="/assets/WS-Logo.svg" />
      </AntdLayout.Header>
      <AntdLayout.Content className="flex items-end">
        <div className={cn("flex justify-center w-full", styles.contentWrapper)}>{content}</div>
      </AntdLayout.Content>
      <AntdLayout.Footer className="flex justify-between" style={{ backgroundColor: token.colorWhite }}>
        <Typography.Text type="secondary">
          2023 <br /> © Work Solutions
        </Typography.Text>
        <img alt="" src="/assets/WS-Logo-Copyright.svg" />
      </AntdLayout.Footer>
    </AntdLayout>
  );
});
