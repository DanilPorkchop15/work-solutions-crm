import React from "react";
import { Outlet } from "react-router-dom";
import { useTitle } from "react-use";
import { CustomerPreview } from "@frontend/entities/customer";
import { Flex, Typography } from "antd";

import { CustomersTableModuleProvider } from "../../../entities/customer/model/table/config";
import { CustomerBulkDeleteFeature } from "../../../features/customer/bulk-delete/index";
import { CustomerBulkRestoreFeature } from "../../../features/customer/bulk-restore/index";
import { CustomerCreateFeature } from "../../../features/customer/create/index";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { CustomersTableWidget } from "../../../widgets/customer/table/index";
import { useHeader } from "../../../widgets/header/config";

function CustomersRootPage() {
  useTitle(AppTitles.getCustomersTitle());
  useHeader(<Typography.Title level={2}>Клиенты</Typography.Title>);

  return (
    <div className="h-full w-full">
      <CustomersTableModuleProvider>
        <Flex vertical gap={12}>
          <div>
            <CustomerCreateFeature.Button />
          </div>
          <CustomersTableWidget
            selectedRowColumnTitleOptions={(customers: CustomerPreview[], onSuccess?: () => Promise<void>) => (
              <Flex gap={5} justify="center">
                <CustomerBulkDeleteFeature.Icon customers={customers} onSuccess={onSuccess} />
                <span>|</span>
                <CustomerBulkRestoreFeature.Icon customers={customers} onSuccess={onSuccess} />
              </Flex>
            )}
          />
        </Flex>
        <Outlet />
      </CustomersTableModuleProvider>
    </div>
  );
}

export const Component = React.memo(CustomersRootPage);
