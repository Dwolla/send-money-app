import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "../../app/fetcher";
import ListGroup from "react-bootstrap/ListGroup";

export default function AccountInformation(props) {
  const res = useSWR("/api/get-account-details", fetcher, {
    refreshInterval: 60000,
  }).data;
  if (!res) return <p>Loading...</p>;

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item variant="light">
          COMPANY NAME: {res.accountDetails.name}
        </ListGroup.Item>
        <ListGroup.Item variant="light">EMAIL: {res.email}</ListGroup.Item>
      </ListGroup>
    </>
  );
}
