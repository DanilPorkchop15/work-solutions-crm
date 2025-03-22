import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Typography } from "antd";

export const CrmLogo = React.memo(function LmsLogo({ linkPath }: { linkPath: string }) {
  return (
    <Link to={linkPath}>
      <Row className="ml-2 cursor-pointer items-center">
        <img alt="Логотип Work Solutions" height="40" src="/assets/WS-Logo-Simple.svg" width="40" />
        <Col className="ml-4">
          <Typography.Title level={3} className="opacity-80">
            WS CRM
          </Typography.Title>
        </Col>
      </Row>
    </Link>
  );
});
