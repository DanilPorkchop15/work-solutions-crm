import React, { memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import { AccessCheck } from "@frontend/entities/viewer";
import { CustomerUpdateForm } from "@frontend/features/customer/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
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
      <AccessCheck type="disable" action={Action.UPDATE} subject={Subject.CUSTOMERS}>
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
      </AccessCheck>
    </Tooltip>
  );
};

export const CustomerUpdateFeature = { Icon: CustomerUpdateIcon, Form: CustomerUpdateForm, Modal: CustomerUpdateModal };
