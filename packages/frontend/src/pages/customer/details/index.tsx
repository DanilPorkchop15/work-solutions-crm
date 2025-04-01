import React from "react";
import { useTitle } from "react-use";
import { CustomerDetailsProvider, CustomersTableModuleProvider } from "@frontend/entities/customer/model";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { CustomerDetailsWidget } from "../../../widgets/customer/details/index";

export function CustomerDetailsPage() {
  useTitle(AppTitles.getCustomerTitle());

  return (
    <Layout.Content>
      <CustomersTableModuleProvider>
        <CustomerDetailsProvider>
          <CustomerDetailsWidget />
        </CustomerDetailsProvider>
      </CustomersTableModuleProvider>
    </Layout.Content>
  );
}

export const Component = React.memo(CustomerDetailsPage);
