import React from "react";

import { CustomerCreateFeature } from "../../../features/customer/create/index";

function CustomerCreatePage() {
  return <CustomerCreateFeature.Modal />;
}

export const Component = React.memo(CustomerCreatePage);
