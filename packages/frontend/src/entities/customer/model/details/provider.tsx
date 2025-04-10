import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { useAsync } from "react-use";
import { PageSpin } from "@worksolutions/antd-react-components";
import { isNil } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";

import { CustomerDetailsService } from "./service";

export const CustomerDetailsProvider = React.memo(function CustomerDetailsProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();

  const customerDetailsService: CustomerDetailsService = useInjectService(CustomerDetailsService);

  const { loading } = useAsync(async () => {
    if (!isNil(id))
      await customerDetailsService.loadCustomerDetails.bind(customerDetailsService)({ urlParams: { id } });
  }, [id]);

  if (loading) return <PageSpin />;

  return <ErrorBoundary fallback={<Navigate replace to={AppRoutes.getCustomersUrl(true)} />}>{children}</ErrorBoundary>;
});
