import { Col, Row } from "react-bootstrap";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        subtitle="Quick overview of proxy traffic, API health, and platform activity."
        className="mb-4"
      />

      <section className="dashboard-section">
        <Row className="g-4">
          <Col md={6} xl={4}>
            <Card className="dashboard-metric-card" bodyClassName="dashboard-metric-body">
              <span className="dashboard-metric-label">API Requests</span>
              <strong className="dashboard-metric-value">23</strong>
              <span className="dashboard-metric-note">Requests forwarded in the latest sample window</span>
            </Card>
          </Col>

          <Col md={6} xl={4}>
            <Card className="dashboard-metric-card" bodyClassName="dashboard-metric-body">
              <span className="dashboard-metric-label">Active APIs</span>
              <strong className="dashboard-metric-value">5</strong>
              <span className="dashboard-metric-note">Registered upstream APIs currently available</span>
            </Card>
          </Col>

          <Col md={6} xl={4}>
            <Card className="dashboard-metric-card" bodyClassName="dashboard-metric-body">
              <span className="dashboard-metric-label">Errors Today</span>
              <strong className="dashboard-metric-value">2</strong>
              <span className="dashboard-metric-note">Upstream or forwarding issues recorded today</span>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="dashboard-section">
        <Row className="g-4">
          <Col lg={7}>
            <Card title="Recent Activity" className="dashboard-panel-card">
              <div className="dashboard-panel-content">
                <p className="dashboard-panel-text mb-0">
                  No recent activity yet. Proxy requests, latency trends, and
                  response summaries will appear here once backend integration is added.
                </p>
              </div>
            </Card>
          </Col>

          <Col lg={5}>
            <Card title="System Status" className="dashboard-panel-card">
              <div className="dashboard-panel-content">
                <p className="dashboard-status-pill mb-3">All systems operational</p>
                <p className="dashboard-panel-text mb-0">
                  Placeholder space for service checks, logging health, and
                  forwarding pipeline alerts.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Dashboard;
