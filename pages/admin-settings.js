import { useState } from "react";
import useSWR from "swr";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import AccountInformation from "../app/components/Admin/AccountInformation";
import BankDetails from "../app/components/BankDetails";
import CustomerLayout from "../app/components/Customer/CustomerLayout"; // This will need to be changed to pull AdminLayout
import fetcher from "../app/fetcher";

const spacingStyle = {
  margin: "30px 0",
};

export default function AdminSettings(props) {
  const [bankExists, setBankExists] = useState(checkBank()); // Set to null if a bank account doees not exist for the Account

  //Retrieving bank details for a Account
  async function checkBank() {
    const { data, error } = await useSWR(
      "/api/get-account-funding-sources",
      fetcher
    );
    if (error || !data) {
      setBankExists(null);
    } else {
      const bankDetails =
        data.accountFundingSources._embedded["funding-sources"][0];
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

AdminSettings.Layout = CustomerLayout;
