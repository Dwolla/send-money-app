import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export default function AdminTable({ customers }) {
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
            <th>Name</th>
            <th>Email</th>
            <th>Send Money</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {c.firstName}
                {c.lastName}
              </td>
              <td>{c.email}</td>
              <td>{c.sendmoney}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
