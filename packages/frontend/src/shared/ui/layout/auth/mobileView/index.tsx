import React from "react";
import { useTheme } from "@frontend/shared/ui/theme";
import { Layout as AntdLayout, theme, Typography } from "antd";
import cn from "classnames";

import styles from "./index.module.scss";

interface AuthLayoutProps {
  content: React.ReactNode;
}

export const MobileView = React.memo(function MobileView({ content }: AuthLayoutProps) {
  const { token } = theme.useToken();

  const { theme: algorithm } = useTheme();

  return (
    <AntdLayout
      className="h-full bg-right-top bg-no-repeat bg-contain"
      style={{ backgroundImage: algorithm === "dark" ? undefined : `url("/assets/auth-background-mobile.png")` }}
    >
      <AntdLayout.Header className="h-auto" style={{ paddingTop: token.paddingLG }}>
        <img
          alt=""
          src="/assets/WS-Logo.svg"
          style={{
            filter: algorithm === "dark" ? "invert(1) hue-rotate(180deg) brightness(1.9)" : undefined
          }}
        />
      </AntdLayout.Header>
      <AntdLayout.Content
        className="flex items-end"
        style={{
          backgroundColor: algorithm === "dark" ? token.colorBgContainer : undefined
        }}
      >
        <div
          className={cn(
            "flex justify-center w-full",
            styles.contentWrapper,
            algorithm === "light" && styles.contentWrapperLight
          )}
        >
          {content}
        </div>
      </AntdLayout.Content>
      <AntdLayout.Footer className="flex justify-between" style={{ backgroundColor: token.colorBgContainer }}>
        <Typography.Text type="secondary">
          {new Date().getFullYear()} <br /> © Work Solutions
        </Typography.Text>
        <img alt="" src="/assets/WS-Logo-Copyright.svg" />
      </AntdLayout.Footer>
    </AntdLayout>
  );
});
