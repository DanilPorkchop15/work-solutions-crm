import React from "react";
import { useAsyncFn } from "react-use";
import { Customer, CustomerDetailsService, useCustomerDetails } from "@frontend/entities/customer";
import { PageSpin } from "@worksolutions/antd-react-components";
import { Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { CustomerDeleteFeature } from "../../../../features/customer/delete/index";
import { CustomerRestoreFeature } from "../../../../features/customer/restore/index";
import { CustomerUpdateFeature } from "../../../../features/customer/update/index";
import { ProjectCreateFeature } from "../../../../features/project/create/index";
import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { Back } from "../../../../shared/ui/back/index";
import { useHeader } from "../../../header/config";

export const CustomerDetailsForm = observer(function CustomerDetailsWidget() {
  const customerDetails: Customer = useCustomerDetails();

  const customerDetailsService: CustomerDetailsService = useInjectService(CustomerDetailsService);

  const onSuccess: () => Promise<void> = () =>
    customerDetailsService.loadCustomerDetails({
      urlParams: {
        id: customerDetails.id
      }
    });

  useHeader(
    <Flex gap={36} align="center">
      <Back backUrl={AppRoutes.getCustomersUrl(true)} />
      {customerDetails.deletedAt !== null ? (
        <Typography.Title level={2}>Информация о клиенте</Typography.Title>
      ) : (
        <Typography.Title level={2}>Редактирование клиента</Typography.Title>
      )}
      {customerDetails.deletedAt === null ? (
        <Flex gap={12}>
          <CustomerDeleteFeature.Button customer={customerDetails} onSuccess={onSuccess} size="small" />
          <ProjectCreateFeature.ForCustomerButton customer={customerDetails} size="small" type="primary" />
        </Flex>
      ) : (
        <CustomerRestoreFeature.Button customer={customerDetails} onSuccess={onSuccess} size="small" />
      )}
    </Flex>,
    [customerDetails.deletedAt]
  );

  const [{ loading }] = useAsyncFn(
    async () =>
      customerDetailsService.loadCustomerDetails({
        urlParams: {
          id: customerDetails.id
        }
      }),
    []
  );
  if (loading) return <PageSpin />;

  return (
    <Flex vertical justify="space-between" gap={48}>
      <CustomerUpdateFeature.Form />
    </Flex>
  );
});
