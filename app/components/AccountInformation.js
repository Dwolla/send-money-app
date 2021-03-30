import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function AccountInformation(props) {
  const [isAdmin, setIsAdmin] = useState(props.isAdmin); // Needs to be set based on context

  return (
    <ListGroup variant="flush">
      <ListGroup.Item variant="light">
        NAME: {props.firstName} {props.lastName}
      </ListGroup.Item>
      {isAdmin === true ? (
        <>
          <ListGroup.Item variant="light">
            COMPANY NAME: {props.name}
          </ListGroup.Item>
          <ListGroup.Item variant="light">EMAIL: {props.email}</ListGroup.Item>
        </>
      ) : (
        <ListGroup.Item variant="light">EMAIL: {props.email}</ListGroup.Item>
      )}
    </ListGroup>
  );
}
