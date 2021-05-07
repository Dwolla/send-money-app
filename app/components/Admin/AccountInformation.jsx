import useSWR from 'swr';
import ListGroup from 'react-bootstrap/ListGroup';
import fetcher from '../../fetcher';

export default function AccountInformation() {
  // Using usseSWR to make a GET call to the Account details endpoint
  const res = useSWR('/api/account-details', fetcher, {
    refreshInterval: 60000,
  }).data;
  if (!res) return <p>Loading...</p>;

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item variant="light">
          COMPANY NAME: {res.accountDetails.name}
        </ListGroup.Item>
        <ListGroup.Item variant="light">EMAIL: {res.email}</ListGroup.Item>{' '}
        {/* {res.email} represents the email that's logged in to the session */}
      </ListGroup>
    </>
  );
}
