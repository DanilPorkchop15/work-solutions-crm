import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { CustomerDetailsProvider, CustomersTableModuleProvider } from "@frontend/entities/customer/model";
import { ProjectsTableModuleProvider } from "@frontend/entities/project";
import { Divider, Flex, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services";
import { Layout } from "../../../shared/ui/layout";
import { CustomerDetailsWidget } from "../../../widgets/customer/details";

export function CustomerDetailsPage() {
  useTitle(AppTitles.getCustomerTitle());

  return (
    <Layout.Content>
      <ProjectsTableModuleProvider>
        <CustomersTableModuleProvider>
          <CustomerDetailsProvider>
            <Flex vertical gap={24}>
              <Typography.Title level={3}>Информация о клиенте</Typography.Title>
              <CustomerDetailsWidget.Form />
            </Flex>
            <Divider />
            <Flex vertical gap={24}>
              <Typography.Title level={3}>Проекты клиента</Typography.Title>
              <CustomerDetailsWidget.ProjectsTable />
            </Flex>
            <Outlet />
          </CustomerDetailsProvider>
        </CustomersTableModuleProvider>
      </ProjectsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(CustomerDetailsPage);
