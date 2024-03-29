import { useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import useSWR from 'swr';
import fetcher from '../app/fetcher';
import AdminLayout from '../app/components/Admin/AdminLayout';
import AdminTable from '../app/components/Admin/AdminTable';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function AdminPage() {
  const { user, error, isLoading } = useUser();
  const { data } = useSWR('/api/customer-list', fetcher);

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return <Redirect to="/" />;
  }

  return (
    <AdminLayout>
      <h3>CUSTOMERS</h3>
      {isLoading && <p>Loading profile...</p>}

      {error && (
        <>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </>
      )}

      {user && data && (
        <AdminTable customers={data.customers._embedded.customers} />
      )}
    </AdminLayout>
  );
}

export const getServerSideProps = withPageAuthRequired();
