import Table from "react-bootstrap/Table";
import type { ApiRecord } from "./apiTypes";

interface ApiTableProps {
  apis: ApiRecord[];
  copiedApiId: string | null;
  onCopyApiKey: (api: ApiRecord) => void;
}

const getMethodBadgeClass = (method: ApiRecord["method"]) => {
  switch (method) {
    case "GET":
      return "api-method-badge api-method-badge--get";
    case "POST":
      return "api-method-badge api-method-badge--post";
    case "PUT":
      return "api-method-badge api-method-badge--put";
    case "DELETE":
      return "api-method-badge api-method-badge--delete";
    case "PATCH":
      return "api-method-badge api-method-badge--patch";
    default:
      return "api-method-badge";
  }
};

const maskApiKey = (apiKey: string) => {
  const visibleStart = apiKey.slice(0, 10);
  return `${visibleStart}....`;
};

const ApiTable = ({ apis, copiedApiId, onCopyApiKey }: ApiTableProps) => {
  if (apis.length === 0) {
    return (
      <div className="api-table-empty">
        <h3 className="api-table-empty-title">No APIs match this view</h3>
        <p className="api-table-empty-text mb-0">
          Try another filter or create a new API endpoint to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="api-table-wrapper">
      <Table responsive hover className="api-table mb-0 align-middle">
        <thead>
          <tr>
            <th>Method</th>
            <th>Target URL</th>
            <th>API Key</th>
            <th>Created At</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apis.map((api) => (
            <tr key={api.id}>
              <td>
                <span className={getMethodBadgeClass(api.method)}>
                  {api.method}
                </span>
              </td>
              <td className="api-target-url">{api.targetUrl}</td>
              <td className="api-key-cell">{maskApiKey(api.apiKey)}</td>
              <td className="api-created-at">{api.createdAt ?? "--"}</td>
              <td className="text-end">
                <div className="api-row-actions">
                  <button
                    type="button"
                    className="api-action-button"
                    onClick={() => onCopyApiKey(api)}
                  >
                    {copiedApiId === api.id ? "Copied" : "Copy"}
                  </button>
                  <button type="button" className="api-action-button">
                    Test
                  </button>
                  <button type="button" className="api-action-button api-action-button--danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApiTable;
