import { useContext } from 'react';
import axios from 'axios';
import { mutate, trigger } from 'swr';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { CustomerContext } from './context/CustomerContext';

const spacingStyle = {
  margin: '30px 0',
};

export default function BankDetails({ id, name, bankAccountType, status }) {
  const [customerId] = useContext(CustomerContext);
  // Using Axios for POST request to remove bank
  function removeBank() {
    mutate(`/api/customer-funding-sources/${customerId}`, false);
    axios.post(`/api/remove-bank/${id}`).then((response) => response);
    trigger(`/api/customer-funding-sources/${customerId}`);
  }

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
