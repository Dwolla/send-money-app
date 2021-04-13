import CustomerLayout from '../app/components/Customer/CustomerLayout';
import TransfersTable from '../app/components/TransfersTable';
import { getCustomerTransfers } from '../app/dwolla';
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

export default function Dashboard({ props }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;
// hard code admin email
  if(!user || user.email === ""){
    return <Redirect to="/" />
  } else {
    return (
      <>
        <h3>PAYMENT HISTORY</h3>
        <TransfersTable transfers={props._embedded.transfers} />
      </>
    );
  }

  }


// Fetch customer's transfers at the time of page load
export const getStaticProps = async () => {
  const data = await getCustomerTransfers();

  return {
    props: data,
  };
};

Dashboard.Layout = CustomerLayout;
