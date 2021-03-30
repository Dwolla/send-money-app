import { useState } from "react";
import useSWR from "swr";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import AccountInformation from "../app/components/AccountInformation";
import AddBank from "../app/components/AddBank";
import BankDetails from "../app/components/BankDetails";
import CustomerLayout from "../app/components/CustomerLayout";
import fetcher from "../app/fetcher";

const spacingStyle = {
  margin: "30px 0",
};

export default function AccountSettings(props) {
  const [isAdmin, setIsAdmin] = useState(false); // Set Admin based on session
  const [bankExists, setBankExists] = useState(checkBank());

  //Retrieve accountInformation and bankDetails to send as props to the components
  //Retrieving bank details for a Customer
  async function checkBank() {
    const { data, error } = await useSWR(
      "/api/get-customer-funding-sources",
      fetcher
    );
    if (error || !data) {
      console.log(data);
      setBankExists(null);
    } else {
      const bankDetails =
        data.customerFundingSources._embedded["funding-sources"][0];
      console.log(bankDetails);
      setBankExists(bankDetails);
    }
  }

  return (
    <>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        <AccountInformation accountInformation />
      </div>
      <div style={spacingStyle}>
        <h5>Payment information</h5>
        {bankExists ? (
          <BankDetails {...bankExists} />
        ) : (
          <div style={spacingStyle}>
            <AddBank />
          </div>
        )}
      </div>
    </>
  );
}

AccountSettings.Layout = CustomerLayout;
