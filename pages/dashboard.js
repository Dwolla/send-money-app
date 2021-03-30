import CustomerLayout from "../app/components/CustomerLayout";
import TransfersTable from "../app/components/TransfersTable";
import Button from "react-bootstrap/Button";

import { getCustomerTransfers } from "../app/dwolla";

export default function Dashboard(props) {
  const transferData = props._embedded.transfers;

  return (
    <>
      <h3>PAYMENT HISTORY</h3>
      <TransfersTable transfers={transferData} />
    </>
  );
}

export const getStaticProps = async () => {
  const data = await getCustomerTransfers();

  return {
    props: data,
  };
};

Dashboard.Layout = CustomerLayout;
