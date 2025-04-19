import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { CustomerInput, useCustomersTableModule } from "@frontend/entities/customer";
import { useViewer, ViewerModel } from "@frontend/entities/viewer";
import { CustomerService } from "@frontend/features/customer/services";
import { AntdServices } from "@frontend/shared/model/services";
import { CreationModal } from "@frontend/shared/ui/creationModal";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { CustomerCreateRequestDTO } from "@work-solutions-crm/libs/shared/customer/customer.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { pipe } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../../shared/model/services/appRoutes";
import { mapCustomerCreateFormValuesToCreateCustomerDto } from "../api";
import { CustomerCreateFormValues } from "../interfaces";

const SUCCESS_MESSAGE = "Клиент успешно создан";

export const CustomerCreateModal = observer(function CreateCustomerModal() {
  const customerService: CustomerService = useInjectService(CustomerService);
  const antdServices: AntdServices = useInjectService(AntdServices);

  const viewer: ViewerModel = useViewer();

  const customerTableModule = useCustomersTableModule();

  const [createCustomerForm] = Form.useForm<CustomerCreateFormValues>();

  const navigate: NavigateFunction = useNavigate();

  const cancel: () => void = () => {
    navigate(AppRoutes.getCustomersUrl(true));
  };

  const [{ loading, error }, onSubmit] = useAsyncFn(async (body: CustomerCreateRequestDTO) => {
    await customerService.create(body);
    antdServices.notification.success({ message: SUCCESS_MESSAGE });
    await customerTableModule.load();
    cancel();
  });

  return (
    <CreationModal title="Добавление клиента" onCancel={cancel}>
      <Form
        autoComplete="off"
        form={createCustomerForm}
        layout="vertical"
        name="createCustomer"
        size="middle"
        validateTrigger="onSubmit"
        onFinish={pipe(mapCustomerCreateFormValuesToCreateCustomerDto, onSubmit)}
      >
        <CustomerInput.Name error={error} />
        <CustomerInput.Email error={error} />
        <CustomerInput.Phone error={error} />
        <CustomerInput.Inn error={error} />
        <CustomerInput.Website error={error} />
        <FormErrorMessage error={error} />
        <Form.Item style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 8 }} onClick={cancel}>
            Отмена
          </Button>
          <Button htmlType="submit" loading={loading} type="primary">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </CreationModal>
  );
});
