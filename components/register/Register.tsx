"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { API_MAIL, API_AUTH_REGISTER } from "@/lib/utils";
import {
  RegisterContainer,
  RegisterTitle,
  RegisterForm,
  RegisterField,
  Label,
  Input,
  EyeIconContainer,
  Button,
  SignInSection,
} from "./styled";
import Link from "next/link";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const initRegisterForm: RegisterForm = {
  email: "",
  username: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [registerForm, setRegisterForm] = useState(initRegisterForm);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [registerProgress, setRegisterProgress] = useState(0);
  const [errMsg, setErrMsg] = useState<string | undefined>("");
  //0: unfinished, 1: succeeded, 2: failed

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate form
    if (registerForm.password !== registerForm.password2) {
      alert("Passwords doesn't match");
      return;
    }
    //call request
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerForm.email,
        password: registerForm.password,
        username: registerForm.username,
      }),
    });
    const {statusCode, errors} : ResponseDTO = await response.json()

    if (statusCode !== 201) {
      setRegisterProgress(2); //fail
      setErrMsg(errors.toString())
    } else {
      setRegisterProgress(1); //successfully
      //clear all input
      setRegisterForm(initRegisterForm);

      //send mail
      const mailInfo: MailInfo = {
        subject: "Blueprint Account",
        toEmail: "duongtangtai@gmail.com",
        text: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h2>Thank you for being a part of us!</h2>
            <h3>Your account has been created.</h3>
            <p>Email: ${registerForm.email}</p>
            <p>Password: ${registerForm.password}</p>
            <br />
        </body>
        </html>`,
      };
      await fetch(API_MAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailInfo),
      });
      //handle logic for mail sending....
    }
  };

  const handleFormOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!/\s/.test(target.value)) {
      setRegisterForm((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  return (
    <RegisterContainer>
      <RegisterTitle>
        <h1>Create an account</h1>
        <p>Let's get started with your 30 days free trial</p>
      </RegisterTitle>
      <RegisterForm autoComplete="one-time-code" onSubmit={handleRegister}>
        <RegisterField $flexDirection="column">
          <Label htmlFor="email">Email</Label>
          <Input
            required
            type="email"
            id="email"
            name="email"
            placeholder="tai.duong@cyberlogitech.com"
            autoComplete="one-time-code"
            value={registerForm.email}
            onChange={handleFormOnChange}
          />
        </RegisterField>
        <RegisterField $flexDirection="column">
          <Label htmlFor="username">Username</Label>
          <Input
            required
            type="text"
            id="username"
            name="username"
            placeholder="taiduong"
            autoComplete="one-time-code"
            value={registerForm.username}
            onChange={handleFormOnChange}
          />
        </RegisterField>
        <RegisterField $flexDirection="column" $position="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            required
            type={isPasswordShown ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="one-time-code"
            value={registerForm.password}
            onChange={handleFormOnChange}
          />
          <EyeIconContainer
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            {isPasswordShown ? <MdVisibility /> : <MdVisibilityOff />}
          </EyeIconContainer>
        </RegisterField>
        <RegisterField $flexDirection="column" $position="relative">
          <Label htmlFor="password2">Confirm password</Label>
          <Input
            required
            type={isPasswordShown ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="Retype your password"
            autoComplete="one-time-code"
            value={registerForm.password2}
            onChange={handleFormOnChange}
          />
          <EyeIconContainer
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            {isPasswordShown ? <MdVisibility /> : <MdVisibilityOff />}
          </EyeIconContainer>
        </RegisterField>
        {registerProgress === 1 ? (
          <span style={{ color: "blue" }}>Registered successfully</span>
        ) : registerProgress === 2 ? (
          <span style={{ color: "red" }}>{errMsg}</span>
        ) : (
          ""
        )}
        <Button $bgcolor="#0d6efd" $color="white" type="submit">
          Sign Up
        </Button>
      </RegisterForm>
      <SignInSection>
        <span style={{ paddingRight: "20px" }}>Already have an account?</span>
        <Link href="/login" style={{ color: "blue" }}>
          Sign in
        </Link>
      </SignInSection>
    </RegisterContainer>
  );
};

export default Register;
