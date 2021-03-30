import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const spacingStyle = {
  margin: "30px 0",
};

export default function BankDetails(props) {
  console.log(props);
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
        <Button size="lg" variant="danger">
          Remove Bank
        </Button>
      </div>
    </>
  );
}
