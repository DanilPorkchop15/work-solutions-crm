import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { CustomerPreview } from "@frontend/entities/customer";
import { AccessCheck } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { CustomerService } from "../services/CustomerService";

interface CustomerBulkDeleteFeatureProps {
  customers: CustomerPreview[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные клиенты успешно удалены";

const CustomerBulkDeleteFeatureBase = React.memo(function BulkDeleteCustomersFeature({
  customers,
  disabled,
  onSuccess,
  children,
  ...props
}: CustomerBulkDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const customerService: CustomerService = useInjectService(CustomerService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const customerBulkDeleteFn: () => Promise<void> = async () => {
    await customerService.bulkDelete(customers.map(customer => customer.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={<Typography.Text>Вы уверены, что хотите архивировать {customers.length} клиентов?</Typography.Text>}
        title="Архивировать клиентов"
      />
      <AccessCheck type="disable" action={Action.DELETE} subject={Subject.CUSTOMERS}>
        <Button
          danger
          disabled={disabled ?? (customers.length === 0 || customers.some(c => c.deletedAt !== null))}
          onClick={withConfirmation(customerBulkDeleteFn)}
          {...props}
        >
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const CustomerBulkDeleteButton = React.memo(function CustomerBulkDeleteButton(props: CustomerBulkDeleteFeatureProps) {
  return (
    <CustomerBulkDeleteFeatureBase type="primary" {...props}>
      {props.customers.length > 0 ? "Архивировать" : "Выберите клиентов"}
    </CustomerBulkDeleteFeatureBase>
  );
});

const CustomerBulkDeleteIcon = React.memo(function CustomerBulkDeleteIcon(props: CustomerBulkDeleteFeatureProps) {
  return (
    <Tooltip title="Архивировать выбранных клиентов">
      <CustomerBulkDeleteFeatureBase
        icon={<DeleteFilled style={{ fontSize: 18 }} />}
        size="middle"
        type="link"
        {...props}
      />
    </Tooltip>
  );
});

export const CustomerBulkDeleteFeature = {
  Icon: CustomerBulkDeleteIcon,
  Button: CustomerBulkDeleteButton
};
