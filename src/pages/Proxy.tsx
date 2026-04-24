import { useState } from "react";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import RequestForm from "../components/ui/RequestForm";

const Proxy = () => {

    const [hhtpmethod, setHttpMethod] = useState("GET");
    const [apiKey, setApiKey] = useState("");
    const [pathSuffix, setPathSuffix] = useState("");
    const [queryParams, setQueryParams] = useState("");
    const [headers, setHeaders] = useState("");
    const [requestBody, setRequestBody] = useState("");


  return (
    <div className="proxy-page">
      <div className="proxy-page-header">
        <PageHeader
          title="Proxy Test"
          subtitle="Send requests through smartAPI and inspect forwarded responses."
          className="mb-0"
        />
      </div>

      <div className="proxy-layout">
        <Card className="proxy-request-card" title="Request Builder">
          <div className="proxy-request-content">
            <RequestForm />
          </div>
        </Card>

        <Card className="proxy-response-card" title="Response">
          <div className="proxy-response-content">
            <div className="proxy-response-placeholder">
              <div className="proxy-response-icon">/</div>
              <p className="proxy-response-title">No response yet</p>
              <p className="proxy-response-text mb-0">
                Click &quot;Send Request&quot; to test your proxy configuration.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Proxy;
