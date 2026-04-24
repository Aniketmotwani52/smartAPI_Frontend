import { Col, Row } from "react-bootstrap";
import Card from "../ui/Card";
import type { ApiRecord, ApiMethod } from "./apiTypes";

interface ApiStatsRowProps {
  apis: ApiRecord[];
}

const formatLastCreated = (apis: ApiRecord[]) => {
  if (apis.length === 0) {
    return "No APIs yet";
  }

  return apis[0].createdAt ?? "Backend does not return created time yet";
};

const ApiStatsRow = ({ apis }: ApiStatsRowProps) => {
  const activeMethods = Array.from(
    new Set(apis.map((api) => api.method)),
  ) as ApiMethod[];

  return (
    <Row className="g-4">
      <Col md={6} xl={4}>
        <Card className="api-stat-card" bodyClassName="api-stat-card-body">
          <span className="api-stat-label">Total APIs</span>
          <strong className="api-stat-value">{apis.length}</strong>
          <span className="api-stat-note">Across all registered endpoints</span>
        </Card>
      </Col>

      <Col md={6} xl={4}>
        <Card className="api-stat-card" bodyClassName="api-stat-card-body">
          <span className="api-stat-label">Active Methods</span>
          <strong className="api-stat-value">{activeMethods.length}</strong>
          <span className="api-stat-note">{activeMethods.join(", ")}</span>
        </Card>
      </Col>

      <Col md={6} xl={4}>
        <Card className="api-stat-card" bodyClassName="api-stat-card-body">
          <span className="api-stat-label">Last Created</span>
          <strong className="api-stat-value api-stat-value--small">
            {apis.length > 0 ? "Latest entry" : "No data"}
          </strong>
          <span className="api-stat-note">{formatLastCreated(apis)}</span>
        </Card>
      </Col>
    </Row>
  );
};

export default ApiStatsRow;
