import { Form } from "react-bootstrap";
import Button from "./Button";

type ProxyRequest = {
  httpMethod: string;
  apiKey: string;
  targetUrl: string;
  pathSuffix: string;
  queryParams: string;
  headers: string;
  requestBody: string;
};

type Api = {
  apiKey: string;
  method: string;
  targetUrl: string;
};

interface RequestFormProps {
  apiDetails: Api[];
  formData: ProxyRequest;
  handleChange: (field: keyof ProxyRequest, value: string) => void;
  onSubmit: () => void;
}

const RequestForm = ({
  apiDetails,
  formData,
  handleChange,
  onSubmit,
}: RequestFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleApiKeyChange = (apiKey: string) => {
    // ✅ Handle deselection (edge case fix)
    if (!apiKey) {
      handleChange("apiKey", "");
      handleChange("httpMethod", "");
      handleChange("targetUrl", "");
      return;
    }

    const selectedApi = apiDetails.find((api) => api.apiKey === apiKey);

    if (!selectedApi) return;

    const {
      apiKey: selectedApiKey,
      method: selectedMethod,
      targetUrl: selectedTargetUrl,
    } = selectedApi;

    handleChange("apiKey", selectedApiKey);
    handleChange("httpMethod", selectedMethod);
    handleChange("targetUrl", selectedTargetUrl);
  };

  return (
    <Form onSubmit={handleSubmit}>
      
      {/* API KEY */}
      <Form.Group controlId="apiKey" className="mt-3 proxy-field-group">
        <Form.Label className="proxy-field-label">API Key</Form.Label>
        <Form.Control
          as="select"
          value={formData.apiKey}
          onChange={(e) => handleApiKeyChange(e.target.value)}
          required
        >
          <option value="">Select API Key</option>
          {apiDetails.map((apiDetail) => (
            <option key={apiDetail.apiKey} value={apiDetail.apiKey}>
              {apiDetail.apiKey}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* METHOD */}
      <Form.Group controlId="httpMethod" className="proxy-field-group">
        <Form.Label className="proxy-field-label">HTTP Method</Form.Label>
        <Form.Control
          type="text"
          value={formData.httpMethod}
          disabled
        />
      </Form.Group>

      {/* TARGET URL */}
      <Form.Group controlId="targetUrl" className="proxy-field-group">
        <Form.Label className="proxy-field-label">Target URL</Form.Label>
        <Form.Control
          type="text"
          value={formData.targetUrl}
          disabled
        />
      </Form.Group>

      {/* PATH SUFFIX */}
      <Form.Group controlId="pathSuffix" className="mt-3 proxy-field-group">
        <Form.Label className="proxy-field-label">
          Path Suffix (optional)
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="/users/123"
          value={formData.pathSuffix}
          onChange={(e) => handleChange("pathSuffix", e.target.value)}
        />
      </Form.Group>

      {/* QUERY PARAMS */}
      <Form.Group controlId="queryParams" className="mt-3 proxy-field-group">
        <Form.Label className="proxy-field-label">
          Query Parameters
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="page=1&limit=10"
          value={formData.queryParams}
          onChange={(e) => handleChange("queryParams", e.target.value)}
        />
      </Form.Group>

      {/* HEADERS */}
      <Form.Group controlId="headers" className="mt-3 proxy-field-group">
        <Form.Label className="proxy-field-label">
          Headers (JSON format)
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder='{"Content-Type": "application/json"}'
          value={formData.headers}
          onChange={(e) => handleChange("headers", e.target.value)}
        />
      </Form.Group>

      {/* REQUEST BODY */}
      <Form.Group controlId="requestBody" className="mt-3 proxy-field-group">
        <Form.Label className="proxy-field-label">
          Request Body
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder='{"name": "John Doe"}'
          value={formData.requestBody}
          onChange={(e) => handleChange("requestBody", e.target.value)}
          disabled={formData.httpMethod === "GET"} // ✅ good UX
        />
      </Form.Group>

      {/* SUBMIT BUTTON */}
      <Button type="submit" disabled={!formData.apiKey}>
        Send Request
      </Button>
    </Form>
  );
};

export default RequestForm;