import useSWR from 'swr';
import ListGroup from 'react-bootstrap/ListGroup';
import fetcher from '../../fetcher';

export default function CustomerInformation({ customerId }) {
  const res = useSWR(
    customerId ? `/api/customer-details/${customerId}` : null,
    fetcher,
    {
      refreshInterval: 60000,
    }
  ).data;
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
