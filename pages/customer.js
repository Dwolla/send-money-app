import CustomerLayout from "../app/components/customerLayout";
import TransfersTable from "../app/components/table";
import Transfers from "../app/transfers-data";

export default function CustomerPage(props) {
  return (
    <CustomerLayout>
      <h4>Your transactions</h4>
      <TransfersTable transfers={Transfers} />
    </CustomerLayout>
  );
}
