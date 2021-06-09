import { useState } from 'react';
import Modal from 'react-modal';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import { useUser } from '@auth0/nextjs-auth0';
import fetcher from '../fetcher';

// For Modal accessibility
Modal.setAppElement('#__next');

// handle submit for form
const handleSubmit = (event) => {
  event.preventDefault();
  // console.log(document.getElementById("account-funding-source").value)
  // console.log(document.getElementById("customer-funding-source").value)
};

export default function AdminTable({ customers }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useUser();
  const { data: info } = useSWR('/api/account-funding-sources', fetcher);
  // if(info){
  //   console.log("info", info)
  //   {info.accountFundingSources._embedded["funding-sources"].map((d) => {
  //     console.log(d.id)
  //     console.log(d.name)
  //   })}
  // }

  // const onChangeFS = (e) => {
  //   const selectedId = e.target.value
  //   const selectedFS = info.filter((d) => d.id == selectedId);
  //   console.log("onchange", onChangeFS)

  // }

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
              <td>
                {c.sendmoney}
                <button type="button" onClick={() => setModalIsOpen(true)}>
                  Send Money
                </button>
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
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="account-funding-source">
              From
              <select name="account-funding-source" id="account-funding-source">
                {user && info && (
                  <>
                    {info.accountFundingSources._embedded[
                      'funding-sources'
                    ].map((d) => (
                      <option key={d.id} value={d.id}>
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
              <select
                name="customer-funding-source"
                id="customer-funding-source"
              >
                <option value="1">One</option>
              </select>
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
