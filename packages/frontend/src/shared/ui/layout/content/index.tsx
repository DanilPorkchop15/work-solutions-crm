import React from "react";
import { Layout, LayoutProps, theme } from "antd";
import cn from "classnames";

export const Content = React.memo(function Content({ children, className = "", style = {}, ...props }: LayoutProps) {
  const { token } = theme.useToken();

  return (
    <Layout.Content
      className={cn("w-full shadow p-6 rounded-md min-h-fit", className)}
      style={{
        boxShadow: "0px 4px 10px -3px rgba(34, 60, 80, 0.51)",
        backgroundColor: token.colorBgContainer,
        ...style
      }}
      {...props}
    >
      {children}
    </Layout.Content>
  );
});
