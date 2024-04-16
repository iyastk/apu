"use client";

import React, { useState } from "react";
import { User } from "firebase/auth";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "./../../utils/firebase";
import FormInput from "@/components/formInput";
import Button from "@/components/button";

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultValues);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormField = () => {
    setFormFields(defaultValues);
  };
  const handleFormOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const user = response?.user;
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use)") {
        alert("Email already exist");
      } else if (error.code === "auth/weak-password") {
        alert("weak password. please include at least six characters");
      }
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>hi sign up with email and password</h1>
      <form onSubmit={handleFormOnSubmit}>
        <FormInput
          type="text"
          name="displayName"
          id=""
          required
          onChange={handleFormChange}
          value={displayName}
          label="Display Name"
        ></FormInput>
        <FormInput
          label={"Email"}
          type="email"
          name="email"
          id=""
          required
          onChange={handleFormChange}
          value={email}
        ></FormInput>
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          id=""
          required
          onChange={handleFormChange}
          value={password}
        ></FormInput>
        <FormInput
          label={"Confirm Password"}
          type="password"
          name="confirmPassword"
          id=""
          required
          onChange={handleFormChange}
          value={confirmPassword}
        />   
        <Button type={"submit"} buttonClass={"p-2"}>sign up</Button> 
      </form>
    </div>
  );
};

export default SignUpForm;
