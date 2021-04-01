import { useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const spacingStyle = {
  margin: "30px 0",
};

export default function BankDetails(props) {
  const [shouldFetch, setShouldFetch] = useState(false);
  function removeBank() {
    axios
      .post(`/api/remove-bank/${props.id}`)
      .then((response) => console.log(response));
  }

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item variant="light">BANK NAME: {props.name}</ListGroup.Item>
        <ListGroup.Item variant="light" style={{ textTransform: "capitalize" }}>
          STATUS: {props.status}
        </ListGroup.Item>
        <ListGroup.Item variant="light" style={{ textTransform: "capitalize" }}>
          TYPE: {props.bankAccountType}
        </ListGroup.Item>
      </ListGroup>
      <div style={spacingStyle}>
        {/* The Remove button will call a function that calls the API to remove the bank */}
        <Button size="lg" variant="danger" onClick={removeBank}>
          Remove Bank
        </Button>
      </div>
    </>
  );
}
