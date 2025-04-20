import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import {
  CustomerDetailsProvider,
  CustomerLogsTableModuleProvider,
  CustomersTableModuleProvider
} from "@frontend/entities/customer/model";
import { ProjectsTableModuleProvider } from "@frontend/entities/project";
import { Flex, Splitter, Typography } from "antd";

import { AppTitles } from "../../../shared/model/services";
import { Layout } from "../../../shared/ui/layout";
import { CustomerDetailsWidget } from "../../../widgets/customer/details";
import { CustomerLogsWidget } from "../../../widgets/customer/logs/index";
import { CustomerProjectsTableWidget } from "../../../widgets/customer/projects-table/index";

export function CustomerDetailsPage() {
  useTitle(AppTitles.getCustomerTitle());

  return (
    <Layout.Content>
      <ProjectsTableModuleProvider>
        <CustomersTableModuleProvider>
          <CustomerDetailsProvider>
            <CustomerLogsTableModuleProvider>
              <Splitter layout="vertical">
                <Splitter.Panel resizable={true} defaultSize="60%">
                  <Splitter>
                    <Splitter.Panel resizable={false}>
                      <Flex vertical gap={24} className="pr-8">
                        <Typography.Title level={3}>Информация о клиенте</Typography.Title>
                        <CustomerDetailsWidget />
                      </Flex>
                    </Splitter.Panel>
                    <Splitter.Panel resizable={false}>
                      <Flex vertical gap={24} className="pl-8">
                        <Typography.Title level={3}>История изменений</Typography.Title>
                        <CustomerLogsWidget />
                      </Flex>
                    </Splitter.Panel>
                  </Splitter>
                </Splitter.Panel>
                <Splitter.Panel resizable={true} collapsible={{ start: true }}>
                  <Flex vertical gap={24} className="pt-8">
                    <Typography.Title level={3}>Проекты клиента</Typography.Title>
                    <CustomerProjectsTableWidget />
                  </Flex>
                </Splitter.Panel>
              </Splitter>
              <Outlet />
            </CustomerLogsTableModuleProvider>
          </CustomerDetailsProvider>
        </CustomersTableModuleProvider>
      </ProjectsTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(CustomerDetailsPage);
