import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const spacingStyle = {
  margin: "30px 0",
};

export default function BankDetails(props) {
  // Using Axios for POST request to remove bank
  function removeBank() {
    axios.post(`/api/remove-bank/${props.id}`).then((response) => response);
  }

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item variant="light">BANK NAME: {props.name}</ListGroup.Item>
        <ListGroup.Item variant="light" style={{ textTransform: "capitalize" }}>
          TYPE: {props.bankAccountType}
        </ListGroup.Item>
        <ListGroup.Item variant="light" style={{ textTransform: "capitalize" }}>
          STATUS: {props.status}
        </ListGroup.Item>
      </ListGroup>
      <div style={spacingStyle}>
        <Button size="lg" variant="danger" type="submit" onClick={removeBank}>
          Remove Bank
        </Button>
      </div>
    </>
  );
}
