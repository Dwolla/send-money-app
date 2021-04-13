import CustomerLayout from '../app/components/Customer/CustomerLayout';
import TransfersTable from '../app/components/TransfersTable';

import { getCustomerTransfers } from '../app/dwolla';

export default function Dashboard({ props }) {
  return (
    <>
      <h3>PAYMENT HISTORY</h3>
      <TransfersTable transfers={props._embedded.transfers} />
    </>
  );
}

// Fetch customer's transfers at the time of page load
export const getStaticProps = async () => {
  const data = await getCustomerTransfers();

  return {
    props: data,
  };
};

Dashboard.Layout = CustomerLayout;