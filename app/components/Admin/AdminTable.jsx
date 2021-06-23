/* eslint-disable no-undef */
import { useState } from 'react';
import Modal from 'react-modal';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';
import fetcher from '../../fetcher';

// For Modal accessibility
Modal.setAppElement('#__next');

export default function AdminTable({ customers }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useUser();
  const { data: info } = useSWR('/api/account-funding-sources', fetcher);
  const [customerFS, setCustomerFS] = useState();

  async function handleModal(id) {
    setModalIsOpen(true);
    const data = await axios
      .get(`/api/customer-funding-sources/${id}`)
      .then((res) => res.data);
    setCustomerFS({ ...data.customerFundingSources._embedded });
  }

  // handle submit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/api/initiate-transfer', {
        source: document.getElementById('account-funding-source').value,
        destination: document.getElementById('customer-funding-source').value,
        amount: document.getElementById('amount').value,
      })
      .then(
        (response) => {
          // eslint-disable-next-line no-alert
          alert('Transfer successful!');
          return response;
        },
        (error) => {
          // eslint-disable-next-line no-alert
          alert('Error: Failed to create a transfer', error);
          // eslint-disable-next-line no-console
          console.log(error);
        }
      );
  };

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
            <th style={{ display: 'none' }}>Id</th>
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
              <td>
                {c.sendmoney}
                <button type="button" onClick={() => handleModal(c.id)}>
                  Send Money
                </button>
              </td>
              <td id="customerId" style={{ display: 'none' }}>
                {c.id}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              background: 'grey',
              left: '300px',
              right: '25px',
            },
            content: {
              color: 'orange',
            },
          }}
        >
          <button
            type="button"
            style={{ background: 'none', float: 'right' }}
            onClick={() => {
              setModalIsOpen(false);
              setCustomerFS();
            }}
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="account-funding-source">
              From
              <select name="account-funding-source" id="account-funding-source">
                {user && info && (
                  <>
                    {info.accountFundingSources._embedded['funding-sources']
                      .filter((d) => d.status === 'verified')
                      .map((d) => (
                        <option id="sourceInput" key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </label>
            <br />

            <label htmlFor="customer-funding-source">
              To
              {customerFS &&
                (customerFS['funding-sources'].length === 0 ? (
                  <p>Receiver has no active funding-sources</p>
                ) : (
                  <select
                    name="customer-funding-source"
                    id="customer-funding-source"
                  >
                    {customerFS['funding-sources'].map((ba) => (
                      <option id="destinationInput" key={ba.id} value={ba.id}>
                        {ba.name}
                      </option>
                    ))}
                  </select>
                ))}
            </label>

            <br />
            <br />
            <label htmlFor="amount">
              Amount
              <input id="amount" type="number" />
            </label>
            {/* send acfs, cust, fundingsource, and amount, onclick */}
            {/* send data to onclick */}
            <button type="submit">Send</button>
          </form>
        </Modal>
      </div>
    </Container>
  );
}
