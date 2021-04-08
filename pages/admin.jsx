import AdminLayout from '../app/components/Admin/AdminLayout';
import AdminTable from '../app/components/AdminTable';
import CustomerData from '../app/components/customer-data';

export default function AdminPage() {
  return (
    <AdminLayout>
      <h4>Your Customers</h4>
      <AdminTable data={CustomerData} />
    </AdminLayout>
  );
}
