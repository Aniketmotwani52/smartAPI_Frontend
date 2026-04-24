import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import ApiFilters from "../components/apis/ApiFilters";
import ApiStatsRow from "../components/apis/ApiStatsRow";
import ApiTable from "../components/apis/ApiTable";
import CreateApiModal from "../components/apis/CreateApiModal";
import type { ApiMethod, ApiRecord } from "../components/apis/apiTypes";
import { getApis } from "../services/apis";

const APIs = () => {
  const [apis, setApis] = useState<ApiRecord[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [methodValue, setMethodValue] = useState<"ALL" | ApiMethod>("ALL");
  const [copiedApiId, setCopiedApiId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadApis = async () => {
      try {
        setIsLoading(true);
        const backendApis = await getApis();
        setApis(backendApis);
        setErrorMessage("");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to fetch APIs from backend.";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadApis();
  }, []);

  const filteredApis = apis.filter((api) => {
    const matchesSearch = api.targetUrl
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesMethod = methodValue === "ALL" || api.method === methodValue;

    return matchesSearch && matchesMethod;
  });

  const handleCreateApi = (newApi: ApiRecord) => {
    setApis((currentApis) => [newApi, ...currentApis]);
  };

  const handleCopyApiKey = async (api: ApiRecord) => {
    try {
      await navigator.clipboard.writeText(api.apiKey);
      setCopiedApiId(api.id);
      window.setTimeout(() => setCopiedApiId(null), 1500);
    } catch {
      setCopiedApiId(null);
    }
  };

  return (
    <div className="apis-page">
      <div className="apis-page-header">
        <PageHeader
          title="APIs"
          subtitle="Manage your registered upstream APIs and forwarding targets."
          className="mb-0"
        />

        <Button
          variant="primary"
          className="apis-create-button"
          onClick={() => setShowCreateModal(true)}
        >
          Create API
        </Button>
      </div>

      <ApiStatsRow apis={apis} />

      {errorMessage ? (
        <Alert variant="danger" className="mb-0">
          {errorMessage}
        </Alert>
      ) : null}

      <Card className="apis-table-card" bodyClassName="p-0">
        <div className="apis-table-toolbar">
          <ApiFilters
            searchValue={searchValue}
            methodValue={methodValue}
            onSearchChange={setSearchValue}
            onMethodChange={setMethodValue}
          />
        </div>

        <ApiTable
          apis={isLoading ? [] : filteredApis}
          copiedApiId={copiedApiId}
          onCopyApiKey={handleCopyApiKey}
        />

        {isLoading ? (
          <div className="api-table-loading">Loading APIs from backend...</div>
        ) : null}
      </Card>

      <CreateApiModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onCreateApi={handleCreateApi}
        onError={setErrorMessage}
      />
    </div>
  );
};

export default APIs;
