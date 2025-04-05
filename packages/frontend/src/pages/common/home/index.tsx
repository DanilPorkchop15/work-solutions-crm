import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";
import { AppstoreOutlined, FileAddOutlined, ProjectFilled, UserAddOutlined } from "@ant-design/icons";
import { CustomersTableModuleProvider } from "@frontend/entities/customer";
import { DocumentsTableModuleProvider } from "@frontend/entities/document";
import { ProjectsTableModuleProvider } from "@frontend/entities/project";
import { StatsView } from "@frontend/entities/stats";
import { useViewer, ViewerModel } from "@frontend/entities/viewer";
import { CustomerCreateFeature } from "@frontend/features/customer/create";
import { DocumentCreateFeature } from "@frontend/features/document/create";
import { ProjectCreateFeature } from "@frontend/features/project/create";
import { AppRoutes } from "@frontend/shared/model/services";
import { CustomersTableWidget } from "@frontend/widgets/customer/table";
import { DocumentsTableWidget } from "@frontend/widgets/document/table";
import { useHeader } from "@frontend/widgets/header";
import { ProjectsTableWidget } from "@frontend/widgets/project/table";
import { Button, Card, Col, Flex, message, Row, Space, Tabs, Typography } from "antd";
import cn from "classnames";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";

import styles from "./index.module.scss";

export function HomePage() {
  useTitle(AppTitles.getUserTitle());

  // Примерные данные для демонстрации
  const stats = {
    projects: 12,
    customers: 45,
    documents: 178,
    activeProjects: 5
  };

  const [activeTab, setActiveTab] = React.useState("projects");
  const [pdfLoading, setPdfLoading] = React.useState(false);

  const handleExportToPDF = async () => {
    setPdfLoading(true);
    try {
      const elementId = `pdf-export-${activeTab}`;
      const element = document.getElementById(elementId);

      if (!element) {
        message.error("Элемент для экспорта не найден");
        return;
      }

      const canvas: HTMLCanvasElement = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollY: -window.scrollY
      });

      const pdf = new jsPDF("landscape");
      const imgData: string = canvas.toDataURL("image/png");
      const pdfWidth: number = pdf.internal.pageSize.getWidth();
      const pdfHeight: number = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${activeTab}-export-${new Date().toISOString().slice(0, 10)}.pdf`);

      void message.success("Экспорт в PDF успешно завершен");
    } catch (error) {
      console.error("Ошибка при экспорте в PDF:", error);
      void message.error("Произошла ошибка при экспорте в PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  const viewer: ViewerModel = useViewer();

  useHeader(
    <Typography.Title level={2}>
      Добро пожаловать в систему, <Link to={AppRoutes.getProfileUrl(true)}>{viewer.state.fullName}</Link>!
    </Typography.Title>
  );

  const items = [
    {
      key: "projects",
      label: "Проекты",
      children: (
        <div id="pdf-export-projects">
          <ProjectsTableModuleProvider>
            <ProjectsTableWidget className={cn(styles.tabsTable)} columns={[]} rowSelection={undefined} />
          </ProjectsTableModuleProvider>
        </div>
      )
    },
    {
      key: "customers",
      label: "Клиенты",
      children: (
        <div id="pdf-export-customers">
          <CustomersTableModuleProvider>
            <CustomersTableWidget className={styles.tabsTable} columns={[]} rowSelection={undefined} />
          </CustomersTableModuleProvider>
        </div>
      )
    },
    {
      key: "documents",
      label: "Документы",
      children: (
        <div id="pdf-export-documents">
          <DocumentsTableModuleProvider>
            <DocumentsTableWidget className={styles.tabsTable} columns={[]} rowSelection={undefined} />
          </DocumentsTableModuleProvider>
        </div>
      )
    }
  ];

  return (
    <Layout.Content style={{ padding: "24px" }}>
      {/* Панель быстрой статистики */}
      <StatsView.Cards />

      <Card title="Быстрые действия" style={{ marginBottom: 24 }} extra={<AppstoreOutlined />}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <ProjectCreateFeature.Button block icon={<ProjectFilled />} size="large" />
          </Col>
          <Col span={8}>
            <CustomerCreateFeature.Button block icon={<UserAddOutlined />} size="large" />
          </Col>
          <Col span={8}>
            <DocumentCreateFeature.Button block icon={<FileAddOutlined />} size="large" />
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <Tabs
            defaultActiveKey="projects"
            items={items}
            rootClassName="pb-5"
            onChange={setActiveTab}
            tabBarExtraContent={
              <Space>
                <Button type="link" onClick={handleExportToPDF} loading={pdfLoading}>
                  Экспорт таблицы в PDF
                </Button>
              </Space>
            }
          />
        }
        variant="borderless"
        styles={{ body: { padding: 0 } }}
      ></Card>

      {/* Блок последних активностей */}
      <Card title="Последние действия" style={{ marginTop: 24 }}>
        <Flex vertical gap={12}>
          <Typography.Text>Сегодня 10:00 - Создан новый проект "Анализ рынка"</Typography.Text>
          <Typography.Text>Вчера 15:30 - Обновлен договор с ООО "ТехноПарк"</Typography.Text>
          <Typography.Text>Вчера 09:45 - Добавлен новый клиент: Иван Петров</Typography.Text>
        </Flex>
      </Card>
    </Layout.Content>
  );
}

export const Component = React.memo(HomePage);
