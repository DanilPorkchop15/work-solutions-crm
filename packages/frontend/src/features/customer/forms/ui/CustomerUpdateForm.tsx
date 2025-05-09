import React from "react";
import { useAsyncFn } from "react-use";
import { CustomerInput, useCustomerLogsTableModule, useCustomersTableModule } from "@frontend/entities/customer";
import { AccessCheck } from "@frontend/entities/viewer";
import { mapCustomerUpdateFormValuesToUpdateCustomerDto } from "@frontend/features/customer/forms/api";
import { AntdServices } from "@frontend/shared/model/services";
import { FormErrorMessage } from "@frontend/shared/ui/forms";
import { Action, Subject } from "@work-solutions-crm/libs/shared/auth/auth.dto";
import { CustomerUpdateRequestDTO } from "@work-solutions-crm/libs/shared/customer/customer.api";
import { Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { pipe } from "ramda";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { CustomerUpdateService } from "../../services";
import { CustomerUpdateFormValues } from "../interfaces";

interface CustomerUpdateFormProps {
  additionalOnFinish?: () => void;
}

const SUCCESS_MESSAGE = "Клиент успешно обновлен";

export const CustomerUpdateForm = observer(function CustomerUpdateFeature({
  additionalOnFinish
}: CustomerUpdateFormProps) {
  const [editCustomerForm] = Form.useForm<CustomerUpdateFormValues>();

  const customersTableModule = useCustomersTableModule();

  const customerLogsTableModule = useCustomerLogsTableModule();

  const updateCustomerService: CustomerUpdateService = useInjectService(CustomerUpdateService);

  const antdServices: AntdServices = useInjectService(AntdServices);

  const [{ error, loading }, onSubmit] = useAsyncFn(
    async (body: CustomerUpdateRequestDTO) => {
      await updateCustomerService.update(body);
      await customersTableModule.load();
      await customerLogsTableModule.load();
      antdServices.notification.success({ message: SUCCESS_MESSAGE });
      additionalOnFinish?.();
    },
    [additionalOnFinish]
  );

  const isDisabled: boolean = updateCustomerService.customerDetails.deletedAt !== null;

  return (
    <Form
      autoComplete="off"
      disabled={isDisabled}
      form={editCustomerForm}
      layout="vertical"
      name="updateCustomer"
      size="middle"
      validateTrigger="onSubmit"
      onFinish={pipe(mapCustomerUpdateFormValuesToUpdateCustomerDto, onSubmit)}
    >
      <CustomerInput.Name
        error={error}
        initialValue={updateCustomerService.customerDetails.name}
        disabled={isDisabled}
      />
      <CustomerInput.Email
        error={error}
        initialValue={updateCustomerService.customerDetails.email ?? undefined}
        disabled={isDisabled}
      />
      <CustomerInput.Phone
        error={error}
        initialValue={updateCustomerService.customerDetails.phone ?? undefined}
        disabled={isDisabled}
      />
      <CustomerInput.Inn
        error={error}
        initialValue={updateCustomerService.customerDetails.inn ?? undefined}
        disabled={isDisabled}
      />
      <CustomerInput.Website
        error={error}
        initialValue={updateCustomerService.customerDetails.website ?? undefined}
        disabled={isDisabled}
      />
      <FormErrorMessage error={error} />
      {!isDisabled && (
        <Form.Item style={{ textAlign: "right" }}>
          <AccessCheck type="hide" action={Action.UPDATE} subject={Subject.CUSTOMERS}>
            <Button htmlType="submit" loading={loading} type="primary">
              Сохранить
            </Button>
          </AccessCheck>
        </Form.Item>
      )}
    </Form>
  );
});
