import { useState } from "react";
import useSWR from "swr";
import fetcher from "../../app/fetcher";
import ListGroup from "react-bootstrap/ListGroup";

export default function CustomerInformation(props) {
  const res = useSWR("/api/get-customer-details", fetcher, {
    refreshInterval: 60000,
  }).data;
  if (!res) return <p>Loading...</p>;

  return (
    <ListGroup variant="flush">
      <ListGroup.Item variant="light">
        NAME: {res.customerDetails.firstName} {res.customerDetails.lastName}
      </ListGroup.Item>
      <ListGroup.Item variant="light">
        EMAIL: {res.customerDetails.email}
      </ListGroup.Item>
    </ListGroup>
  );
}
