import { useState } from 'react';
import useSWR from 'swr';

import AccountInformation from '../app/components/Admin/AccountInformation';
import BankDetails from '../app/components/BankDetails';
import AdminLayout from '../app/components/Admin/AdminLayout';
import fetcher from '../app/fetcher';

const spacingStyle = {
  margin: '30px 0',
};

export default function AdminSettings() {
  // eslint-disable-next-line no-use-before-define
  const [bankExists, setBankExists] = useState(checkBank()); // Set to null if a bank account doees not exist for the Account

  // Retrieving bank details for a Account
  async function checkBank() {
    const { data, error } = await useSWR(
      '/api/get-account-funding-sources',
      fetcher
    );
    if (error || !data) {
      setBankExists(null);
    } else {
      const bankDetails =
        data.accountFundingSources._embedded['funding-sources'][0];
      setBankExists(bankDetails);
    }
  }

  return (
    <>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        <AccountInformation />
      </div>
      <div style={spacingStyle}>
        <h5>Payment information</h5>
        {bankExists ? (
          <BankDetails {...bankExists} />
        ) : (
          <div style={spacingStyle}>
            <p>You don't have a verified bank account attached.</p>
            <p> Add a new verified Bank via the API.</p>
          </div>
        )}
      </div>
    </>
  );
}

AdminSettings.Layout = AdminLayout;
