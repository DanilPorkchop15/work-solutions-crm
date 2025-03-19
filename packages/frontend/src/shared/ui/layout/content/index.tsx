import React from "react";
import { Layout, LayoutProps } from "antd";
import cn from "classnames";

export const Content = React.memo(function Content({ children, className = "", style = {}, ...props }: LayoutProps) {
  return (
    <Layout.Content
      className={cn("w-full bg-white shadow p-6 rounded-md min-h-fit", className)}
      style={{ boxShadow: "0px 4px 10px -3px rgba(34, 60, 80, 0.51)", ...style }}
      {...props}
    >
      {children}
    </Layout.Content>
  );
});
