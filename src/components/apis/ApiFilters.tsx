import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { ApiMethod } from "./apiTypes";

interface ApiFiltersProps {
  searchValue: string;
  methodValue: "ALL" | ApiMethod;
  onSearchChange: (value: string) => void;
  onMethodChange: (value: "ALL" | ApiMethod) => void;
}

const ApiFilters = ({
  searchValue,
  methodValue,
  onSearchChange,
  onMethodChange,
}: ApiFiltersProps) => {
  return (
    <div className="api-filters">
      <InputGroup className="api-search-group">
        <InputGroup.Text className="api-search-icon">Search</InputGroup.Text>
        <Form.Control
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by target URL..."
          aria-label="Search APIs by target URL"
        />
      </InputGroup>

      <Form.Select
        value={methodValue}
        onChange={(event) =>
          onMethodChange(event.target.value as "ALL" | ApiMethod)
        }
        className="api-method-select"
        aria-label="Filter APIs by method"
      >
        <option value="ALL">All Methods</option>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </Form.Select>
    </div>
  );
};

export default ApiFilters;
