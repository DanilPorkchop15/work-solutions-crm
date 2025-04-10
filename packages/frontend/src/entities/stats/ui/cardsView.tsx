import React from "react";
import { useAsyncFn } from "react-use";
import { StatsApi } from "@frontend/entities/stats";
import { useInjectService } from "@frontend/shared/lib/useInjectService";
import { Card, Col, Row, Skeleton, Statistic } from "antd";

export const StatsCardsView = () => {
  const statsApi: StatsApi = useInjectService(StatsApi);
  const [{ loading, value: stats }, getStats] = useAsyncFn(statsApi.getStats.bind(statsApi), [statsApi]);

  React.useEffect(() => {
    void getStats();
  }, [getStats]);

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card variant="borderless">
          <Skeleton loading={loading || !stats} active>
            <Statistic title="Активные проекты" value={stats?.activeProjects} valueStyle={{ color: "#1890ff" }} />
          </Skeleton>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card variant="borderless">
          <Skeleton loading={loading || !stats} active>
            <Statistic title="Всего проектов" value={stats?.projects} valueStyle={{ color: "#52c41a" }} />
          </Skeleton>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card variant="borderless">
          <Skeleton loading={loading || !stats} active>
            <Statistic title="Клиенты" value={stats?.customers} valueStyle={{ color: "#faad14" }} />
          </Skeleton>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card variant="borderless">
          <Skeleton loading={loading || !stats} active>
            <Statistic title="Документы" value={stats?.documents} valueStyle={{ color: "#f5222d" }} />
          </Skeleton>
        </Card>
      </Col>
    </Row>
  );
};
