/* eslint-disable no-undef */
import { useCallback } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const spacingStyle = {
  margin: '30px 0',
};

export default function BankDetails({
  id,
  name,
  bankAccountType,
  status,
  setFundingSource,
}) {
  // Using Axios for POST request to remove bank
  const removeBank = useCallback(() => {
    axios.post(`/api/remove-bank/${id}`).then((response) => response);
    setFundingSource(false);
  }, []);

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item variant="light">BANK NAME: {name}</ListGroup.Item>
        <ListGroup.Item variant="light" style={{ textTransform: 'capitalize' }}>
          TYPE: {bankAccountType}
        </ListGroup.Item>
        <ListGroup.Item variant="light" style={{ textTransform: 'capitalize' }}>
          STATUS: {status}
        </ListGroup.Item>
      </ListGroup>
      <div style={spacingStyle}>
        <Button size="lg" variant="danger" type="submit" onClick={removeBank}>
          Remove Bank
        </Button>
      </div>
    </>
  );
}
