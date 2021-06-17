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
  // const [customerId, setCustomerId] = useState('');
  // const [customerFS, setCustomerFS] = useState();

  // async function check_form() {
  //   console.log('Test 1');
  //   await sleep(1000);
  //   console.log('Test 2');
  // }

  let data;

  async function handleSendMoney(id) {
    setModalIsOpen(true);
    // setCustomerId(id);
    // console.log('e', id);

    data = await axios
      .get(`/api/customer-funding-sources/${id}`)
      .then((res) => res.data);

    // console.log('data', data);
    // setCustomerFS(true);

    // newData = data.map(item => ({[item.country]: item.states}));
    // setCustomerFS(data.customerFundingSources._embedded["funding-sources"].map(item => {item.id; item.name}))

    // console.log('c', customerFS);

    // console.log(data.customerFundingSources._embedded[
    //   'funding-sources'
    // ].map(ba => ba.name))

    // console.log("d", data.customerFundingSources._embedded["funding-sources"])

    // const setCustomerFS = axios.get(
    //   `/api/customer-funding-sources/${id}`
    // );

    // console.log("custFS", setCustomerFS)
  }

  // function custFS() {
  //   const custInfo = {
  //     customerId: document.getElementById('customerId').value
  //   };
  //   return custInfo;
  // }

  // const custFS=()=>{
  //   // console.log(e);
  //   const customerId = document.getElementById('customerId').value;
  //   const response = axios.get(
  //     `/api/customer-funding-sources/${customerId}`
  //   );
  //   return response;
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
                <button type="button" onClick={() => handleSendMoney(c.id)}>
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
                {data && (
                  <>
                    {data.customerFundingSources._embedded[
                      'funding-sources'
                    ].map((ba) => (
                      <option key={ba.id} value={ba.id}>
                        {ba.name}
                      </option>
                    ))}
                  </>
                )}
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
