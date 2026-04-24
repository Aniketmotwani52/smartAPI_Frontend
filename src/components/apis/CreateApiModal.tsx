import { useState, type FormEvent } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "../ui/Button";
import { createApi } from "../../services/apis";
import { getCurrentUserId } from "../../services/currentUser";
import type { ApiMethod, ApiRecord } from "./apiTypes";

interface CreateApiModalProps {
  show: boolean;
  onHide: () => void;
  onCreateApi: (api: ApiRecord) => void;
  onError: (message: string) => void;
}

const methodOptions: ApiMethod[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const CreateApiModal = ({
  show,
  onHide,
  onCreateApi,
  onError,
}: CreateApiModalProps) => {
  const [method, setMethod] = useState<ApiMethod>("GET");
  const [targetUrl, setTargetUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setMethod("GET");
    setTargetUrl("");
    onHide();
  };

  const submitCreateApi = async () => {
    const trimmedUrl = targetUrl.trim();
    const userId = getCurrentUserId();

    onError("");

    if (!trimmedUrl) {
      onError("Target URL is required.");
      return;
    }

    if (!userId) {
      onError(
        "No current user id found. Set localStorage key `smartapi.userId` or add `VITE_USER_ID`.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const createdApi = await createApi({
        method,
        targetUrl: trimmedUrl,
        userId,
      });

      onCreateApi(createdApi);
      handleClose();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create API.";
      onError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await submitCreateApi();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create API</Modal.Title>
        </Modal.Header>

        <Modal.Body className="create-api-modal-body">
          <Form.Group className="mb-3" controlId="apiMethod">
            <Form.Label>Method</Form.Label>
            <Form.Select
              value={method}
              onChange={(event) => setMethod(event.target.value as ApiMethod)}
            >
              {methodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="targetUrl">
            <Form.Label>Target URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://api.example.com/resource"
              value={targetUrl}
              onChange={(event) => setTargetUrl(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              void submitCreateApi();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create API"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateApiModal;
