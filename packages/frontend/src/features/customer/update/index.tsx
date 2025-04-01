import React, { memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { CustomerUpdateForm } from "@frontend/features/customer/forms";
import { Button, Tooltip } from "antd";

import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { CreationModal } from "../../../shared/ui/creationModal/index";

const CustomerUpdateModal = memo(function CustomerUpdateFeature() {
  const navigate: NavigateFunction = useNavigate();

  const cancel: () => void = () => {
    navigate(AppRoutes.getCustomersUrl(true));
  };

  return (
    <CreationModal title="Редактирование клиента" onCancel={cancel}>
      <CustomerUpdateForm additionalOnFinish={cancel} />
    </CreationModal>
  );
});

interface CustomerUpdateIconProps {
  customerId: string;
  disabled?: boolean;
}

const CustomerUpdateIcon: React.FC<CustomerUpdateIconProps> = ({ customerId, disabled }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <Tooltip title="Редактировать">
      <Button
        className="customer-update-icon"
        onClick={() => {
          navigate(AppRoutes.getUpdateCustomerUrl(true, customerId));
        }}
        disabled={disabled}
        icon={<EditFilled />}
        shape="circle"
        size="small"
        type="link"
      ></Button>
    </Tooltip>
  );
};

export const CustomerUpdateFeature = { Icon: CustomerUpdateIcon, Form: CustomerUpdateForm, Modal: CustomerUpdateModal };
