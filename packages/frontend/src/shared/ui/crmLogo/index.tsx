import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Typography } from "antd";

export const LmsLogo = React.memo(function LmsLogo({ linkPath }: { linkPath: string }) {
  return (
    <Link to={linkPath}>
      <Row className="ml-2 cursor-pointer items-end">
        <img alt="Логотип Work Solutions" height="40" src="/assets/WS-Logo-Simple.svg" width="40" />
        <Col className="ml-2">
          <Typography.Text className="block text-sm opacity-80">WS</Typography.Text>
          <Typography.Text className="block ml-2 text-sm opacity-80">CRM</Typography.Text>
        </Col>
      </Row>
    </Link>
  );
});
