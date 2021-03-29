import { useState } from "react";
import CustomerLayout from "../app/components/customerLayout";
import AddBank from "../app/components/add-bank";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const spacingStyle = {
  margin: "30px 0",
};

export default function AccountSettings(props) {
  const [bankExists, setBankExists] = useState(false); // Check API: Set to true if bank exists

  return (
    <>
      <h3>SETTINGS</h3>
      <div style={spacingStyle}>
        <h5>Account information</h5>
        <ListGroup variant="flush">
          <ListGroup.Item variant="light">NAME: some_name</ListGroup.Item>
          <ListGroup.Item variant="light">EMAIL: some_email</ListGroup.Item>
        </ListGroup>
      </div>
      <div style={spacingStyle}>
        <h5>Payment information</h5>
        {bankExists && (
          <ListGroup variant="flush">
            <ListGroup.Item variant="light">
              BANK NAME: some_name
            </ListGroup.Item>
            <ListGroup.Item variant="light">STATUS: some_status</ListGroup.Item>
            <ListGroup.Item variant="light">TYPE: some_type</ListGroup.Item>
          </ListGroup>
        )}
        <div style={spacingStyle}>
          {bankExists ? (
            <Button size="lg" variant="danger">
              Remove Bank
            </Button>
          ) : (
            <AddBank />
          )}
        </div>
      </div>
    </>
  );
}

AccountSettings.Layout = CustomerLayout;
