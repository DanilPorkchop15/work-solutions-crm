import React from "react";
import { useTitle } from "react-use";
import { UserDetailsProvider, UsersTableModuleProvider } from "@frontend/entities/@common/user/model";
import { Flex, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { UserDetailsWidget } from "../../../widgets/user/details/index";

export function UserDetailsPage() {
  useTitle(AppTitles.getUserTitle());

  return (
    <Layout.Content>
      <UsersTableModuleProvider>
        <UserDetailsProvider>
          <Flex vertical gap={24}>
            <Typography.Title level={3}>Информация о пользователе</Typography.Title>
            <UserDetailsWidget />
          </Flex>
        </UserDetailsProvider>
      </UsersTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(UserDetailsPage);
