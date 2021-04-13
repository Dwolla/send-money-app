import AdminLayout from '../app/components/Admin/AdminLayout';
import AdminTable from '../app/components/AdminTable';
import CustomerData from '../app/components/customer-data';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function AdminPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!user) {
    return <Redirect to="/" />;
  } else if (user.email === 'moreira.kd@outlook.com') {
    return (
      <AdminLayout>
        <h4>Your Customers</h4>
        <AdminTable data={CustomerData} />
      </AdminLayout>
    );
  } else {
    return <Redirect to="/dashboard" />;
  }
}
