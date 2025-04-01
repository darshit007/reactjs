import { useState } from "react";

const User = ({ name, location }) => {
  const [count] = useState([0]);
  const [countSecond] = useState([1]);
  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h1>Second Count = {countSecond}</h1>
      <h2>Name: {name}</h2>
      <h3>Location: {location}</h3>
      <h4>Contact: @darshit007</h4>
    </div>
  );
};

export default User;
