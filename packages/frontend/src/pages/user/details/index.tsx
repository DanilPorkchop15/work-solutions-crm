import React from "react";
import { useTitle } from "react-use";
import {
  UserDetailsProvider,
  UserLogsTableModuleProvider,
  UsersTableModuleProvider
} from "@frontend/entities/@common/user/model";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { Flex, Splitter, Typography } from "antd";

import { AccessCheck } from "../../../entities/viewer/ui/accessCheck";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { UserDetailsWidget } from "../../../widgets/user/details/index";
import { UserLogsWidget } from "../../../widgets/user/logs/index";

export function UserDetailsPage() {
  useTitle(AppTitles.getUserTitle());

  return (
    <Layout.Content>
      <UsersTableModuleProvider>
        <UserDetailsProvider>
          <UserLogsTableModuleProvider>
            <Splitter>
              <Splitter.Panel resizable={false}>
                <Flex vertical gap={24} className="pr-8">
                  <Typography.Title level={3}>Информация о пользователе</Typography.Title>
                  <UserDetailsWidget />
                </Flex>
              </Splitter.Panel>
              <Splitter.Panel resizable={false}>
                <Flex vertical gap={24} className="pl-8">
                  <Typography.Title level={3}>История изменений</Typography.Title>
                  <UserLogsWidget />
                </Flex>
              </Splitter.Panel>
            </Splitter>
          </UserLogsTableModuleProvider>
        </UserDetailsProvider>
      </UsersTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(UserDetailsPage);
