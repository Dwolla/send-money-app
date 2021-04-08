import AdminLayout from "../app/components/adminLayout";
import AdminTable from "../app/components/adminTable";
import CustomerData from "../app/components/customer-data";

export default function AdminPage(props) {
  return (
    <AdminLayout>
      <h4>Your Customers</h4>
      <AdminTable data={CustomerData} />
    </AdminLayout>
  );
}