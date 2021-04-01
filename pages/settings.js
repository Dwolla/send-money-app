import { useState, useEffect } from "react";
import useSWR from "swr";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import AccountInformation from "../app/components/AccountInformation";
import AddBank from "../app/components/AddBank";
import BankDetails from "../app/components/BankDetails";
import CustomerInformation from "../app/components/CustomerInformation";
import CustomerLayout from "../app/components/CustomerLayout";
import fetcher from "../app/fetcher";

const spacingStyle = {
  margin: "30px 0",
};

export default function AccountSettings(props) {
  const [isAdmin, setIsAdmin] = useState(true); // Set Admin based on session
  const [bankExists, setBankExists] = useState(checkBank());

  //Retrieving bank details for a Customer
  async function checkBank() {
    if (isAdmin === false) {
      const { data, error } = await useSWR(
        "/api/get-customer-funding-sources",
        fetcher
      );
      if (error || !data) {
        setBankExists(null);
      } else {
        const bankDetails =
          data.customerFundingSources._embedded["funding-sources"][0];
        setBankExists(bankDetails);
      }
    } else {
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
  }

  return (
    <>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        {isAdmin === true ? <AccountInformation /> : <CustomerInformation />}
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
