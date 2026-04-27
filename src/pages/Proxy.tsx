import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import RequestForm from "../components/ui/RequestForm";
import { getCurrentUserId } from "../services/currentUser";
import { fetchApisByUserId, proxyRequestCall } from "../services/proxy";

type Api = {
  apiKey: string;
  method: string;
  targetUrl: string;
};

const Proxy = () => {
  const [apiDetails, setApiDetails] = useState<Api[]>([]);
  const [proxyResponse, setProxyResponse] = useState<string>("");

  useEffect(() => {
    fetchApiKeys();
  }, []);

  useEffect(() => {
    console.log("Api Details are updated");
    console.log(apiDetails);
  }, [apiDetails]);

  const fetchApiKeys = async () => {
    console.log("We will fetch the api keys");
    const userId = getCurrentUserId();
    console.log("User ID", userId);
    const allApiKeys = await fetchApisByUserId(userId);
    setApiDetails(allApiKeys.apis);
  };

  type ProxyRequest = {
    httpMethod: string;
    apiKey: string;
    targetUrl: string;
    pathSuffix: string;
    queryParams: string;
    headers: string;
    requestBody: string;
  };

  const defaultProxyRequestState: ProxyRequest = {
    httpMethod: "",
    apiKey: "",
    targetUrl: "",
    pathSuffix: "",
    queryParams: "",
    headers: "",
    requestBody: "",
  };

  const [proxyRequest, setProxyRequest] = useState<ProxyRequest>(
    defaultProxyRequestState,
  );

  const handleProxyRequestChange = (
    field: keyof ProxyRequest,
    value: string,
  ) => {
    setProxyRequest((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting proxy request:", proxyRequest);
    setProxyRequest(defaultProxyRequestState);
    try {
      const response = await proxyRequestCall(proxyRequest);
      console.log(response);

      let data;

      try {
        data = JSON.parse(response);
      } catch {
        data = response;
      }
      setProxyResponse(data);
    } catch (err) {
      console.error(err);
    }
  };

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
            <RequestForm
              apiDetails={apiDetails}
              formData={proxyRequest}
              handleChange={handleProxyRequestChange}
              onSubmit={handleSubmit}
            />
          </div>
        </Card>

        <Card className="proxy-response-card" title="Response">
          <div className="proxy-response-content">
            <div className="proxy-response-placeholder">
              {proxyResponse === "" ? (
                <div className="proxy-response-icon">/</div>
              ) : null}
              <div className="proxy-response-text mb-0">
                <pre>
                  {typeof proxyResponse === "string"
                    ? proxyResponse
                    : JSON.stringify(proxyResponse, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Proxy;
