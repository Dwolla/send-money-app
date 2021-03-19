import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

export default function TransfersTable({ transfers }) {
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
          {transfers.map((transfer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{transfer.date}</td>
              <td>${transfer.amount}</td>
              <td>{transfer.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
