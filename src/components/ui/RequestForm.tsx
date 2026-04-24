import { Form } from 'react-bootstrap'
import Button from './Button'

interface RequestFormProps {
    httpMethod: string;
    apiKey: string;
    pathSuffix: string;
    queryParams: string;
    headers: string;
    requestBody: string;
}

const RequestForm = () => {
  return (
    <Form>
        <Form.Group controlId="methodSelect" className="proxy-field-group">
            <Form.Label className="proxy-field-label">HTTP Method</Form.Label>
            <Form.Control as="select">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                <option>PATCH</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="apiKey" className="mt-3 proxy-field-group">
            <Form.Label className="proxy-field-label">API Key</Form.Label>
            <Form.Control as="select">
                <option>API Key 1</option>
                <option>API Key 2</option>
                <option>API Key 3</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="pathSuffix" className="mt-3 proxy-field-group">
            <Form.Label className="proxy-field-label">Path Suffix (optional)</Form.Label>
            <Form.Control type="text" placeholder="/users/123" />
        </Form.Group>
        
        <Form.Group controlId="queryParams" className="mt-3 proxy-field-group">
            <Form.Label className="proxy-field-label">Query Parameters</Form.Label>
            <Form.Control type="text" placeholder="page=1&limit=10" />
        </Form.Group>

        <Form.Group controlId="headers" className="mt-3 proxy-field-group">
            <Form.Label className="proxy-field-label">Headers (JSON format)</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder='{"Content-Type": "application/json"}' />
        </Form.Group>

        <Form.Group controlId="requestBody" className="mt-3 proxy-field-group">
            <Form.Label className="proxy-field-label">Request Body</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder='{"name": "John Doe", "email": "john.doe@example.com"}' />
        </Form.Group>

        <Button>
            Send Request
        </Button>

    </Form>
  )
}

export default RequestForm
