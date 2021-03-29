import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function AddBank() {
  return (
    <div>
      <Form>
        <Form.Group as={Row} controlId="routingNumber">
          <Form.Label column sm={2}>
            Routing number
          </Form.Label>
          <Col sm={10}>
            <Form.Control placeholder="222222226" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="accountNumber">
          <Form.Label column sm={2}>
            Account number
          </Form.Label>
          <Col sm={10}>
            <Form.Control placeholder="Account number" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="name">
          <Form.Label column sm={2}>
            Bank account name
          </Form.Label>
          <Col sm={10}>
            <Form.Control placeholder="Name" />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Bank account type
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Checking"
                name="type"
                id="checking"
              />
              <Form.Check
                type="radio"
                label="Savings"
                name="type"
                id="savings"
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 0 }}>
            <Button size="lg" type="submit">
              Add Bank
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
