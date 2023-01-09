/* eslint-disable no-undef */
import { useCallback } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const boxStyle = {
  margin: '30px 0',
  padding: '30px',
  background: '#FFFFFF',
  boxShadow: '0px 2px 12px 1px rgba(129, 129, 145, 0.3)',
  borderRadius: '20px',
};

export default function CreateCustomer({ email, setCustomerId }) {
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      axios
        .post('/api/customer', {
          firstName: `${firstNameInput.value}`,
          lastName: `${lastNameInput.value}`,
          email: `${email}`,
        })
        .then(
          (response) => {
            const location = response.data.token;
            if (location.substring(12, 19) === 'sandbox') {
              const id = location.substring(41);
              setCustomerId(id);
              localStorage.setItem('userDwollaId', id);
            } else {
              const id = location.substring(33);
              setCustomerId(id);
              localStorage.setItem('userDwollaId', id);
            }
          },
          (error) => {
            // eslint-disable-next-line no-console
            console.log('Error: Failed to create a Customer.', error);
          }
        );
    },
    [email]
  );

  return (
    <>
      <h1>Create your payment profile.</h1>
      <div style={boxStyle}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="4" controlId="firstNameInput">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="Jane"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="lastNameInput">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                defaultValue="Doe"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
