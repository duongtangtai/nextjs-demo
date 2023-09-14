"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { API_AUTH_LOGIN } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { signIn, useSession} from "next-auth/react";

import {
  LoginContainer,
  LoginForm,
  LoginField,
  LoginTitle,
  Label,
  Input,
  Button,
  SignUpSection,
} from "./styled";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const [doesLoginFail, setDoesLoginFail] = useState(false);
  const [errMsg, setErrMsg] = useState<string | undefined>("");
  const router = useRouter();
  const { data: session} = useSession();


  //check use session or userInfo
  useEffect(() => {
    const userInfo = getCookie("userInfo");
    if (session || userInfo) {
      router.push("/");
    }
  }, [session]);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //send a post request to check password

    const res = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const {
      isSuccessful,
      error,
      userInfo,
      access_token,
      refresh_token,
    }: LoginResult = await res.json();

    if (!isSuccessful) {
      setDoesLoginFail(true);
      setErrMsg(error);
    } else {
      //check remember
      if (isRemembered) {
        const maxAge = 60 * 60 * 24 * 30;
        setCookie("userInfo", JSON.stringify(userInfo), { maxAge });
        setCookie("access_token", access_token, { maxAge });
        setCookie("refresh_token", refresh_token, { maxAge });
      } else {
        //delete when browser is closed
        setCookie("userInfo", JSON.stringify(userInfo));
        setCookie("access_token", access_token);
        setCookie("refresh_token", refresh_token);
      }

      router.push("/");
    }
  };
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  console.log("render login component");

  return (
    <LoginContainer>
      <LoginTitle>
        <h1>Welcome Back</h1>
        <p>Welcome back! Please enter your details</p>
      </LoginTitle>
      <LoginForm onSubmit={handleSignIn}>
        <LoginField $flexDirection="column">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            type="email"
            id="email"
            placeholder="tai.duong@cyberlogitech.com"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </LoginField>
        <LoginField $flexDirection="column">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type="password"
            id="password"
            placeholder="************"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </LoginField>
        <LoginField $flexDirection="row" className="checkbox-remember">
          <Input
            type="checkbox"
            checked={isRemembered}
            onChange={() => setIsRemembered(!isRemembered)}
          />
          <span>Remember me</span>
          <Link href="#">Forgot Password?</Link>
        </LoginField>
        {doesLoginFail && (
          <div style={{ color: "red", fontWeight: "bold" }}>{errMsg}</div>
        )}
        <Button $bgcolor="#0d6efd" $color="white" type="submit">
          Sign In
        </Button>
        <Button
          $bgcolor="#d9dbde"
          $color="black"
          type="button"
          onClick={() => signIn("google")}
        >
          <FcGoogle />
          <span>Sign In With Google</span>
        </Button>
        <SignUpSection>
          <span>Don't have an account?</span>
          <Link href="/register">Sign up</Link>
        </SignUpSection>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
