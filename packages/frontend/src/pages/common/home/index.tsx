import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";
import { AppstoreOutlined, FileAddOutlined, ProjectFilled, UserAddOutlined } from "@ant-design/icons";
import { CustomersTableModuleProvider } from "@frontend/entities/customer";
import { DocumentsTableModuleProvider } from "@frontend/entities/document";
import { LoggerTableModuleProvider } from "@frontend/entities/logger";
import { ProjectsTableModuleProvider } from "@frontend/entities/project";
import { Button, Card, Col, Flex, message, Row, Space, Tabs, Typography } from "antd";
import cn from "classnames";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { StatsView } from "../../../entities/stats/ui/index";
import { useViewer } from "../../../entities/viewer/hooks";
import { ViewerModel } from "../../../entities/viewer/model";
import { CustomerCreateFeature } from "../../../features/customer/create/index";
import { DocumentCreateFeature } from "../../../features/document/create/index";
import { ProjectCreateFeature } from "../../../features/project/create/index";
import { AppRoutes } from "../../../shared/model/services/appRoutes";
import { AppTitles } from "../../../shared/model/services/appTitles";
import { Layout } from "../../../shared/ui/layout/index";
import { CustomersTableWidget } from "../../../widgets/customer/table/index";
import { DocumentsTableWidget } from "../../../widgets/document/table/index";
import { useHeader } from "../../../widgets/header/config";
import { LoggerTableWidget } from "../../../widgets/logger/table/index";
import { ProjectsTableWidget } from "../../../widgets/project/table/index";

import styles from "./index.module.scss";

export function HomePage() {
  useTitle(AppTitles.getRootTitle());

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

      <Card title="Последние действия" style={{ marginTop: 24 }}>
        <LoggerTableModuleProvider>
          <LoggerTableWidget className={styles.tabsTable} rowSelection={undefined} />
        </LoggerTableModuleProvider>
      </Card>
    </Layout.Content>
  );
}

export const Component = React.memo(HomePage);
