import React from "react";
import { CustomerDetailsProvider } from "@frontend/entities/customer/model";

import { CustomerUpdateFeature } from "../../../features/customer/update";

function CustomerUpdatePage() {
  return (
    <CustomerDetailsProvider>
      <CustomerUpdateFeature.Modal />
    </CustomerDetailsProvider>
  );
}

export const Component = React.memo(CustomerUpdatePage);
