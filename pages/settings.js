import { useState } from "react";
import useSWR from "swr";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import AddBank from "../app/components/AddBank";
import BankDetails from "../app/components/BankDetails";
import CustomerInformation from "../app/components/Customer/CustomerInformation";
import CustomerLayout from "../app/components/Customer/CustomerLayout";
import fetcher from "../app/fetcher";

const spacingStyle = {
  margin: "30px 0",
};

export default function CustomerSettings() {
  const [bankExists, setBankExists] = useState(checkBank());

  //Retrieving bank details for a Customer
  async function checkBank() {
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
  }

  return (
    <>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        <CustomerInformation />
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

CustomerSettings.Layout = CustomerLayout;
