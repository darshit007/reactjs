import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About Class Component</h1>
        <h2>This is a food delivery webapp </h2>
        <UserClass name={"Darshit Modi - class"} location={"Toronto class"} />
        <UserClass name={"Deadman - class"} location={"Ahmedabad class"} />
      </div>
    );
  }
}

const About1 = () => {
  return (
    <div>
      <h1>About</h1>
      <h2>This is a food delivery webapp </h2>
      <UserClass name={"Darshit Modi - class"} location={"Toronto class"} />
      <UserClass name={"Deadman - class"} location={"Ahmedabad class"} />
    </div>
  );
};

export default About;
