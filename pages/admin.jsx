import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import fetcher from '../app/fetcher';
import AdminLayout from '../app/components/Admin/AdminLayout';
import AdminTable from '../app/components/AdminTable';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function AdminPage() {
  const { user, error, isLoading } = useUser();
  const { data } = useSWR('/api/get-customer-list', fetcher);

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return <Redirect to="/" />;
  }

  return (
    <AdminLayout>
      <h3>PAYMENT HISTORY</h3>
      {isLoading && <p>Loading profile...</p>}

      {error && (
        <>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </>
      )}

      {user && data && (
        <>
          <AdminTable customers={data.customers._embedded.customers} />
        </>
      )}
    </AdminLayout>
  );
}
