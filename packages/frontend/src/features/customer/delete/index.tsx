import React from "react";
import { DeleteFilled } from "@ant-design/icons";
import { CustomerPreview } from "@frontend/entities/customer";
import { AntdServices } from "@frontend/shared/model/services";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { useConfirmationModal } from "@worksolutions/antd-react-components";
import { Button, ButtonProps, Tooltip, Typography } from "antd";

import { AccessCheck } from "../../../entities/viewer/ui/accessCheck";
import { useInjectService } from "../../../shared/lib/useInjectService";
import { CustomerService } from "../services/CustomerService";

interface CustomerDeleteFeatureProps extends ButtonProps {
  customer: CustomerPreview;
  disabled?: boolean;
  onSuccess?: () => void | Promise<void>;
  children?: React.ReactNode;
}

const SUCCESS_MESSAGE = "Клиент успешно архивирован";

const CustomerDeleteFeatureBase = React.memo(function ArchiveTariffFeature({
  customer,
  disabled,
  onSuccess,
  children,
  ...props
}: CustomerDeleteFeatureProps & ButtonProps) {
  const [withConfirmation, ConfirmationDialog] = useConfirmationModal();

  const customerService: CustomerService = useInjectService(CustomerService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const customerDeleteFn: () => Promise<void> = async () => {
    await customerService.delete(customer.id);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    onSuccess?.();
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Отменить"
        okText="Архивировать"
        subtitle={
          <Typography.Text>
            Вы уверены, что хотите архивировать клиента —{" "}
            <Typography.Text type="danger">{customer.name}</Typography.Text>
          </Typography.Text>
        }
        title="Архивировать клиента"
      />
      <AccessCheck type="disable" action={Action.DELETE} subject={Subject.CUSTOMERS}>
        <Button danger disabled={disabled} onClick={withConfirmation(customerDeleteFn)} {...props}>
          {children}
        </Button>
      </AccessCheck>
    </>
  );
});

const CustomerDeleteButton = React.memo(function CustomerDeleteButton(props: CustomerDeleteFeatureProps) {
  return (
    <CustomerDeleteFeatureBase type="primary" {...props}>
      {props.customer.deletedAt ? "Архивный клиент" : "Архивировать"}
    </CustomerDeleteFeatureBase>
  );
});

const CustomerDeleteIcon = React.memo(function CustomerDeleteIcon(props: CustomerDeleteFeatureProps) {
  return (
    <Tooltip title={props.customer.deletedAt ? "Архивный клиент" : "Архивировать"}>
      <CustomerDeleteFeatureBase icon={<DeleteFilled style={{ fontSize: 18 }} />} size="small" type="link" {...props} />
    </Tooltip>
  );
});

export const CustomerDeleteFeature = {
  Icon: CustomerDeleteIcon,
  Button: CustomerDeleteButton
};
