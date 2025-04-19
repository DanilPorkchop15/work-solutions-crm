import React, { useMemo, useState } from "react";
import { useAsync } from "react-use";
import { CustomerPreview } from "@frontend/entities/customer";
import { Flex, Select, SelectProps, Spin, Typography } from "antd";
import { Rule } from "antd/es/form";

import { useInjectService } from "../../../../shared/lib/useInjectService";
import { TableDto } from "../../../../shared/model/interfaces/table";
import { CustomersApi } from "../../api";

import { CustomerView } from "./index";

const { Option } = Select;

interface CustomerSelectViewProps {
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: Rule[];
  defaultValue?: string;
  onChange?: (customerId: string | null) => void;
  showSearch?: boolean;
  allowClear?: boolean;
  style?: React.CSSProperties;
}

export const CustomerSelectView: React.FC<CustomerSelectViewProps & SelectProps> = ({
  placeholder = "Выберите клиента",
  required = false,
  disabled = false,
  rules = [],
  onChange,
  showSearch = true,
  allowClear = true,
  style,
  ...props
}) => {
  const customersApi: CustomersApi = useInjectService(CustomersApi);
  const [searchValue, setSearchValue] = useState("");

  const { value: customers, loading } = useAsync(async () => {
    const response: TableDto<CustomerPreview> = await customersApi.getCustomers();
    return response.rows;
  }, []);

  const filteredCustomers: CustomerPreview[] = useMemo(() => {
    if (!customers) return [];
    if (!searchValue) return customers;

    return customers.filter(customer => customer.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [customers, searchValue]);

  return (
    <Select
      showSearch={showSearch}
      placeholder={placeholder}
      optionFilterProp="children"
      disabled={disabled || loading}
      loading={loading}
      allowClear={allowClear}
      onChange={onChange}
      onSearch={showSearch ? setSearchValue : undefined}
      filterOption={false}
      notFoundContent={
        loading ? <Spin size="small" /> : <Typography.Text type="secondary">Клиенты не найдены</Typography.Text>
      }
      {...props}
    >
      {filteredCustomers.map(customer => (
        <Option key={customer.id} value={customer.id}>
          <Flex gap={12} align="center">
            <CustomerView.Preview customer={customer} /> {customer.name}
            {customer.deletedAt && (
              <Typography.Text type="secondary" className="ml-2">
                (архивный)
              </Typography.Text>
            )}
          </Flex>
        </Option>
      ))}
    </Select>
  );
};
