import useSWR from 'swr';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import fetcher from '../../fetcher';

export default function TransfersTable({ customerId }) {
  const { data, error } = useSWR(
    customerId ? `/api/customer-transfer/${customerId}` : null,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <Container className="p-3 my-content">
      <Table
        striped
        bordered
        hover
        className="shadow p-3 mb-5 bg-white rounded"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.transfers._embedded.transfers.map((transfer, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Moment local format="MMM DD YYYY LT">
                    {transfer.created}
                  </Moment>
                </td>
                <td>{transfer.amount.value}</td>
                <td>{transfer.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
