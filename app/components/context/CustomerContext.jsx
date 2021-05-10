import { useState, createContext } from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
  const [customerId, setCustomerId] = useState(
    '6dfe67a7-50c6-4374-8b50-de399ceb6daa'
  ); // Hard coded customer ID temporariliy for demonstration. Will need to be set when the user logs in and a Customer account is created with their email.

  return (
    <CustomerContext.Provider value={[customerId, setCustomerId]}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </CustomerContext.Provider>
  );
};
