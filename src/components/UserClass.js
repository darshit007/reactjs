import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log(this.props.name + "Component did mount");
  }

  componentDidUpdate() {
    console.log(this.props.name + "Component did update");
  }

  render() {
    return (
      <div className="user-card">
        <h1>Count = {this.state.count}</h1>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Increase Count
        </button>
        <h2>Name: {this.props.name}</h2>
        <h3>Location: {this.props.location}</h3>
        <h4>Contact: @darshit007</h4>
      </div>
    );
  }
}

export default UserClass;
