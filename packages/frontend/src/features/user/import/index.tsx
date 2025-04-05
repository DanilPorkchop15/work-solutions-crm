import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import {
  DeleteFilled,
  ExclamationCircleOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { AntdServices } from "@frontend/shared/model/services";
import { Role } from "@work-solutions-crm/libs/shared/user/user.dto";
import { Button, ButtonProps, Flex, Input, Modal, Select, Table, Tooltip, Typography, Upload } from "antd";
import { observer } from "mobx-react-lite";
import * as XLSX from "xlsx";

import { useInjectService } from "../../../shared/lib/useInjectService";
import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { UserService } from "../services/UserService";

import { importedUserRowDecoder } from "./api/decoders";
import { mapImportedDataToBulkCreateDto } from "./api/mappers";

const { Text } = Typography;

export const UserImportModal = observer(function UserImportModal() {
  const { message: antdMessage } = useInjectService(AntdServices);
  const navigate = useNavigate();
  const [fileData, setFileData] = useState<Array<Record<string, any>>>([]);
  const [validationErrors, setValidationErrors] = useState<{ row: number; message: string }[]>([]);
  const userService = useInjectService(UserService);

  const normalizeHeader = (header: string): string => {
    return header.toString().toLowerCase().replace(/\s+/g, "").replace(/ё/g, "е").trim();
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const workbook = XLSX.read(e.target?.result, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: Array<Record<string, any>> = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          void antdMessage.warning("Файл не содержит данных");
          return;
        }

        const headers = Array.from(new Set(jsonData.flatMap(Object.keys))).sort();
        const columnMap: Record<string, string> = {};

        headers.forEach(header => {
          const normalized = normalizeHeader(header);
          if (normalized.includes("фио") || normalized.includes("fullname")) {
            columnMap.fullName = header;
          } else if (normalized.includes("email")) {
            columnMap.email = header;
          } else if (normalized.includes("должность") || normalized.includes("position")) {
            columnMap.position = header;
          } else if (normalized.includes("роль") || normalized.includes("role")) {
            columnMap.role = header;
          }
        });

        const errors: { row: number; message: string }[] = [];
        const validatedData = jsonData.map((row, index) => {
          const rowData = {
            fullName: row[columnMap.fullName],
            email: row[columnMap.email],
            position: columnMap.position ? row[columnMap.position] : undefined,
            role: columnMap.role ? row[columnMap.role] : undefined,
            _raw: row
          };

          const result = importedUserRowDecoder.decodeAny(rowData).cata<[any, null] | [null, string]>({
            Ok: val => [val, null],
            Err: err => [null, err]
          });

          if (result[1]) {
            errors.push({ row: index + 1, message: result[1] });
          }

          return {
            ...(result[0] || rowData),
            _raw: row
          };
        });

        setFileData(validatedData);
        setValidationErrors(errors);

        if (errors.length > 0) {
          void antdMessage.warning(`Найдено ${errors.length} ошибок в данных`);
        } else {
          void antdMessage.success("Файл успешно загружен и проверен");
        }
      } catch (error) {
        void antdMessage.error("Ошибка при чтении файла");
        console.error("File parsing error:", error);
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (fullName: string): boolean => {
    return fullName.trim().length > 0;
  };

  const validateRow = (row: any, index: number): { row: number; message: string }[] => {
    const errors = [];
    if (!validateFullName(row.fullName)) {
      errors.push({ row: index + 1, message: "Недопустимое ФИО" });
    }
    if (!validateEmail(row.email)) {
      errors.push({ row: index + 1, message: "Недопустимый Email" });
    }
    return errors;
  };

  const addEmptyRow = () => {
    if (fileData.length > 0) {
      const lastRow = fileData[fileData.length - 1];
      const lastRowErrors = validateRow(lastRow, fileData.length - 1);

      if (lastRowErrors.length > 0) {
        setValidationErrors(prev => [...prev, ...lastRowErrors]);
        void antdMessage.warning("Пожалуйста, заполните текущую строку перед добавлением новой");
        return;
      }
    }

    const newRow = {
      fullName: "",
      email: "",
      position: "",
      role: Role.USER,
      _isNew: true
    };

    setFileData(prev => [...prev, newRow]);
    setValidationErrors(prev => [...prev, ...validateRow(newRow, fileData.length)]);
  };

  const [{ loading }, handleImport] = useAsyncFn(async () => {
    try {
      const newErrors: { row: number; message: string }[] = [];
      fileData.forEach((row, index) => {
        newErrors.push(...validateRow(row, index));
      });

      setValidationErrors(newErrors);

      if (newErrors.length > 0) {
        void antdMessage.error("Имеются ошибки в данных. Пожалуйста, исправьте их перед импортом.");
        return;
      }

      const dto = mapImportedDataToBulkCreateDto(fileData);
      await userService.bulkCreate(dto);
      void antdMessage.success(`Успешно импортировано ${fileData.length} пользователей`);
      navigate(AppRoutes.getUsersUrl(true));
    } catch (error) {
      void antdMessage.error(error instanceof Error ? error.message : "Ошибка при импорте пользователей");
    }
  }, [fileData, navigate]);

  const handleRemoveRow = (index: number) => {
    setFileData(prev => prev.filter((_, i) => i !== index));
    setValidationErrors(prev => prev.filter(e => e.row !== index + 1));

    setValidationErrors(prev =>
      prev.map(error => {
        if (error.row > index + 1) {
          return { ...error, row: error.row - 1 };
        }
        return error;
      })
    );
  };

  const columns = [
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
      render: (value: any, record: any, index: number) => (
        <Input
          value={value}
          status={validationErrors.some(e => e.row === index + 1 && e.message === "Недопустимое ФИО") ? "error" : ""}
          onChange={e => {
            const newValue = e.target.value;
            const isValid = validateFullName(newValue);
            setFileData(fileData.map((item, i) => (i === index ? { ...item, fullName: newValue } : item)));

            if (!isValid) {
              setValidationErrors(prev =>
                prev.some(e => e.row === index + 1 && e.message === "Недопустимое ФИО")
                  ? prev
                  : [...prev, { row: index + 1, message: "Недопустимое ФИО" }]
              );
            } else {
              setValidationErrors(prev => prev.filter(e => !(e.row === index + 1 && e.message === "Недопустимое ФИО")));
            }
          }}
        />
      )
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (value: any, record: any, index: number) => (
        <Input
          value={value}
          status={validationErrors.some(e => e.row === index + 1 && e.message === "Недопустимый Email") ? "error" : ""}
          onChange={e => {
            const newValue = e.target.value;
            const isValid = validateEmail(newValue);
            setFileData(fileData.map((item, i) => (i === index ? { ...item, email: newValue } : item)));

            if (!isValid) {
              setValidationErrors(prev =>
                prev.some(e => e.row === index + 1 && e.message === "Недопустимый Email")
                  ? prev
                  : [...prev, { row: index + 1, message: "Недопустимый Email" }]
              );
            } else {
              setValidationErrors(prev =>
                prev.filter(e => !(e.row === index + 1 && e.message === "Недопустимый Email"))
              );
            }
          }}
        />
      )
    },
    {
      title: "Должность",
      dataIndex: "position",
      key: "position",
      width: 150,
      render: (value: any, record: any, index: number) => (
        <Input
          value={value}
          onChange={e =>
            setFileData(fileData.map((item, i) => (i === index ? { ...item, position: e.target.value } : item)))
          }
        />
      )
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (value: any, record: any, index: number) => (
        <Select
          className="w-full"
          value={value}
          onChange={val => setFileData(fileData.map((item, i) => (i === index ? { ...item, role: val } : item)))}
          options={Object.values(Role).map(role => ({ value: role, label: role }))}
        />
      )
    },
    {
      title: "Ошибки",
      key: "errors",
      render: (_: any, __: any, index: number) => {
        const error = validationErrors.find(e => e.row === index + 1);
        return error ? (
          <Text type="danger">
            <ExclamationCircleOutlined /> {error.message}
          </Text>
        ) : (
          "-"
        );
      }
    },
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, __: any, index: number) => (
        <Button danger type="link" icon={<DeleteFilled />} onClick={() => handleRemoveRow(index)} />
      )
    }
  ];

  return (
    <Modal
      title="Импорт пользователей"
      open={true}
      width={1200}
      onCancel={() => navigate(AppRoutes.getUsersUrl(true))}
      footer={[
        <Button key="cancel" onClick={() => navigate(AppRoutes.getUsersUrl(true))}>
          Отмена
        </Button>,
        <Button key="add" onClick={addEmptyRow}>
          Добавить строку
        </Button>,
        <Tooltip
          title={
            fileData.length === 0
              ? "Добавьте хотя бы одну строку"
              : validationErrors.length > 0
                ? "Исправьте ошибки в данных"
                : undefined
          }
          placement="topLeft"
        >
          <Button
            key="import"
            type="primary"
            loading={loading}
            onClick={handleImport}
            disabled={fileData.length === 0 || validationErrors.length > 0}
          >
            Импортировать ({fileData.length - validationErrors.length}/{fileData.length})
          </Button>
        </Tooltip>
      ]}
    >
      <Flex vertical gap={16}>
        <Flex gap={12} align="center">
          <Upload accept=".csv,.xlsx,.xls" beforeUpload={handleFileUpload} showUploadList={false} multiple={false}>
            <Button icon={<UploadOutlined />}>Выберите файл</Button>
          </Upload>

          <Tooltip
            title={
              <Flex vertical gap={8} className="p-4">
                <Text strong>Требования к файлу:</Text>
                <Text>- Форматы: CSV, Excel (XLS/XLSX)</Text>
                <Text>- Обязательные столбцы: ФИО, Email</Text>
                <Text>- Опциональные столбцы: Должность, Роль</Text>
                <Text>- Допустимые роли: {Object.values(Role).join(", ")}</Text>
              </Flex>
            }
          >
            <InfoCircleOutlined className="ml-1 cursor-pointer" />
          </Tooltip>
        </Flex>

        {fileData.length > 0 && (
          <Table
            columns={columns}
            dataSource={fileData.map((item, index) => ({ ...item, key: index }))}
            size="small"
            pagination={false}
            scroll={{ x: true, y: 400 }}
            bordered
            rowClassName={(record, index) => (validationErrors.some(e => e.row === index + 1) ? "error-row" : "")}
          />
        )}
      </Flex>
    </Modal>
  );
});

const UserImportButton = React.memo(function UserImportButton(props: ButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      size="large"
      onClick={() => navigate(AppRoutes.getUserImportUrl(true))}
      icon={<ImportOutlined />}
      {...props}
    >
      Импорт пользователей
    </Button>
  );
});

export const UserImportFeature = {
  Button: UserImportButton,
  Modal: UserImportModal
};
