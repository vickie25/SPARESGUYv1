import React from "react";
import { Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleSignIn = ({ onSuccess, onError }) => {
  const googleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the access token to your backend
        const response = await fetch("/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        const data = await response.json();
        onSuccess(data); // Pass the user data to the parent component
      } catch (error) {
        console.error("Google sign-in error:", error);
        onError(error);
      }
    },
    onError,
    scope: "email profile",
  });

  return (
    <Button
      onClick={googleSignIn}
      className="btn btn-light w-100 border border-warning d-flex align-items-center justify-content-center"
    >
      <FaGoogle className="me-2 text-warning" />
      Sign in with Google
    </Button>
  );
};

export default GoogleSignIn;
