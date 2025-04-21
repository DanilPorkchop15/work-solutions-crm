import React from "react";
import {
  CustomerDetailsProvider,
  CustomerLogsTableModuleProvider,
  CustomersTableModuleProvider
} from "@frontend/entities/customer/model";

import { CustomerUpdateFeature } from "../../../features/customer/update";

function CustomerUpdatePage() {
  return (
    <CustomerLogsTableModuleProvider>
      <CustomersTableModuleProvider>
        <CustomerDetailsProvider>
          <CustomerUpdateFeature.Modal />
        </CustomerDetailsProvider>
      </CustomersTableModuleProvider>
    </CustomerLogsTableModuleProvider>
  );
}

export const Component = React.memo(CustomerUpdatePage);
