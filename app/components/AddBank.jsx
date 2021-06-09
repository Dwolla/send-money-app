/* eslint-disable no-undef */
import axios from 'axios';
import { useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function AddBank({ customerId, setFundingSource }) {
  // Loading the dwolla.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.dwolla.com/1/dwolla.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Async function that uses axios to call the funding-sources-token endpoint
  async function asyncFunc() {
    const response = await axios.get(
      `/api/funding-sources-token/${customerId}`
    );
    return response.data.token;
  }

  function callback(err, res) {
    // eslint-disable-next-line no-unused-vars
    const logValue = {
      error: err,
      response: res,
    };

    setFundingSource(true);
  }

  // Function that handles calling the dwolla.js function for adding a bank
  async function addBank() {
    const token = await asyncFunc();
    dwolla.configure('sandbox');
    const bankInfo = {
      routingNumber: document.getElementById('routingNumber').value,
      accountNumber: document.getElementById('accountNumber').value,
      type: document.getElementById('type').value,
      name: document.getElementById('name').value,
    };

    dwolla.fundingSources.create(token, bankInfo, callback);
    return false;
  }

  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Routing Number
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              id="routingNumber"
              name="routingNumber"
              placeholder="222222226"
              defaultValue="222222226"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Account number
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="Account number"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label
            column
            sm={2}
            className="my-1 mr-2"
            htmlFor="inlineFormCustomSelectPref"
          >
            Type
          </Form.Label>
          <Col sm="auto">
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              custom
              id="type"
              name="type"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={addBank}>Submit</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
