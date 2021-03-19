import CustomerLayout from "../app/components/customerLayout";
import TransfersTable from "../app/components/table";
import Transfers from "../app/transfers-data";

export default function Dashboard(props) {
  return (
    <>
      <h3>PAYMENT HISTORY</h3>
      <TransfersTable transfers={Transfers} />
    </>
  );
}

Dashboard.Layout = CustomerLayout;
