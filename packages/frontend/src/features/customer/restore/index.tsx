import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { CustomerPreview } from "@frontend/entities/customer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { AccessCheck } from "../../../entities/viewer/ui/accessCheck";
import { useInjectService } from "../../../shared/lib/useInjectService";
import { CustomerService } from "../services/CustomerService";

interface CustomerRestoreFeatureProps extends ButtonProps {
  customer: CustomerPreview;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Клиент успешно восстановлен";

const CustomerRestoreFeatureBase = React.memo(function RestoreCustomerFeature({
  customer,
  disabled,
  onSuccess,
  children,
  ...props
}: CustomerRestoreFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const customerService: CustomerService = useInjectService(CustomerService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const customerRestoreFn: () => Promise<void> = async () => {
    await customerService.restore(customer.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    void onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Восстановить"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите восстановить клиента —{" "}
            <Typography.Text type="danger">{customer.name}</Typography.Text>
          </Typography.Text>
        }
        title="Восстановить клиента"
      />
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.CUSTOMERS}>
        <Button disabled={disabled} onClick={withConfirmation(customerRestoreFn)} {...props}>
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const CustomerRestoreButton = React.memo(function CustomerRestoreButton(props: CustomerRestoreFeatureProps) {
  return (
    <CustomerRestoreFeatureBase type="primary" {...props}>
      {props.customer.deletedAt ? "Восстановить" : "Архивировать"}
    </CustomerRestoreFeatureBase>
  );
});

const CustomerRestoreIcon = React.memo(function CustomerRestoreIcon(props: CustomerRestoreFeatureProps) {
  return (
    <Tooltip title="Восстановить">
      <CustomerRestoreFeatureBase icon={<RedoOutlined />} size="small" type="primary" shape="circle" {...props} />
    </Tooltip>
  );
});

export const CustomerRestoreFeature = {
  Icon: CustomerRestoreIcon,
  Button: CustomerRestoreButton
};
