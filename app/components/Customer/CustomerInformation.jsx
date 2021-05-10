import { useContext } from 'react';
import useSWR from 'swr';
import ListGroup from 'react-bootstrap/ListGroup';
import fetcher from '../../fetcher';
import { CustomerContext } from '../context/CustomerContext';

export default function CustomerInformation() {
  const [customerId] = useContext(CustomerContext);

  const res = useSWR(`/api/customer-details/${customerId}`, fetcher, {
    refreshInterval: 60000,
  }).data;
  if (!res) return <p>Loading...</p>;

  return (
    <ListGroup variant="flush">
      <ListGroup.Item variant="light">
        NAME: {res.customerDetails.firstName} {res.customerDetails.lastName}
      </ListGroup.Item>
      <ListGroup.Item variant="light">
        EMAIL: {res.customerDetails.email}
      </ListGroup.Item>
    </ListGroup>
  );
}
