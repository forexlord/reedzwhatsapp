import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "@/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in, e.g., update state or perform additional actions
      console.log("Sign-in successful:", result.user);
    } catch (error) {
      // Handle errors during sign-in
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" />
        <LoginButton variant="outlined" onClick={signIn}>
          Sign in with Google
        </LoginButton>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: whitesmoke;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 15px;
`;

const LoginButton = styled(Button)`
  color: black;
  border-color: black;
`;
