import { appLogoURL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  let btnNameInitial = "Login";
  const [btnName, setBtnName] = useState(btnNameInitial);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={appLogoURL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName === "Logout" ? setBtnName("Login") : setBtnName("Logout");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
