import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
