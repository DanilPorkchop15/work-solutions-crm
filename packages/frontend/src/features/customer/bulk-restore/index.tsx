import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { CustomerPreview } from "@frontend/entities/customer";
import { AccessCheck } from "@frontend/entities/viewer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { CustomerService } from "../services/CustomerService";

interface CustomerBulkRestoreFeatureProps {
  customers: CustomerPreview[];
  disabled?: boolean;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Выбранные клиенты успешно восстановлены";

const CustomerBulkRestoreFeatureBase = React.memo(function BulkRestoreCustomersFeature({
  customers,
  disabled,
  onSuccess,
  children,
  ...props
}: CustomerBulkRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const customerService: CustomerService = useInjectService(CustomerService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const customerBulkRestoreFn: () => Promise<void> = async () => {
    await customerService.bulkRestore(customers.map(customer => customer.id));
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={<Typography.Text>Вы уверены, что хотите восстановить {customers.length} клиентов?</Typography.Text>}
        title="Восстановить клиентов"
      />
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.CUSTOMERS}>
        <Button
          type="primary"
          disabled={disabled ?? (customers.length === 0 || customers.some(c => c.deletedAt === null))}
          onClick={withConfirmation(customerBulkRestoreFn)}
          {...props}
        >
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const CustomerBulkRestoreButton = React.memo(function CustomerBulkRestoreButton(
  props: CustomerBulkRestoreFeatureProps
) {
  return (
    <CustomerBulkRestoreFeatureBase type="primary" {...props}>
      {props.customers.length > 0 ? "Восстановить" : "Выберите клиентов"}
    </CustomerBulkRestoreFeatureBase>
  );
});

const CustomerBulkRestoreIcon = React.memo(function CustomerBulkRestoreIcon(props: CustomerBulkRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить выбранных клиентов">
      <CustomerBulkRestoreFeatureBase
        icon={<RedoOutlined />}
        size="small"
        type="primary"
        style={{ border: "none" }}
        shape="circle"
        {...props}
      />
    </Tooltip>
  );
});

export const CustomerBulkRestoreFeature = {
  Icon: CustomerBulkRestoreIcon,
  Button: CustomerBulkRestoreButton
};
