import React from "react";
import { useCookies } from "react-cookie";

function Logout() {
  const [cookies, , removeCookie] = useCookies(["mycookie"]);

  const handleLogout = () => {
    removeCookie("mycookie");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
