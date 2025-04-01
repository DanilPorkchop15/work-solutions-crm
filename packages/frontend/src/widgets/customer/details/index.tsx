import React from "react";
import { useAsyncFn } from "react-use";
import { Customer, CustomerDetailsService, useCustomerDetails } from "@frontend/entities/customer";
import { PageSpin } from "@worksolutions/antd-react-components";
import { Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { CustomerDeleteFeature } from "../../../features/customer/delete/index";
import { CustomerRestoreFeature } from "../../../features/customer/restore/index";
import { CustomerUpdateFeature } from "../../../features/customer/update/index";
import { useInjectService } from "../../../shared/lib/useInjectService";

export const CustomerDetailsWidget = observer(function CustomerDetailsWidget() {
  const customerDetails: Customer = useCustomerDetails();

  const customerDetailsService: CustomerDetailsService = useInjectService(CustomerDetailsService);

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

  const onSuccess: () => Promise<void> = () =>
    customerDetailsService.loadCustomerDetails({
      urlParams: {
        id: customerDetails.id
      }
    });

  return (
    <>
      <Flex gap={36} style={{ marginBottom: 20 }} align="center">
        {customerDetails.deletedAt !== null ? (
          <Typography.Title level={2}>Информация о клиенте</Typography.Title>
        ) : (
          <Typography.Title level={2}>Редактирование клиента</Typography.Title>
        )}
        {customerDetails.deletedAt === null ? (
          <CustomerDeleteFeature.Button customer={customerDetails} onSuccess={onSuccess} size="small" />
        ) : (
          <CustomerRestoreFeature.Button customer={customerDetails} onSuccess={onSuccess} size="small" />
        )}
      </Flex>
      <Flex vertical justify="space-between" gap={48} className="w-[50%]">
        <CustomerUpdateFeature.Form />
      </Flex>
    </>
  );
});
