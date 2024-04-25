"use client";

import React, { useState } from "react";
import {
  auth,
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase";
import FormInput from "@/components/formInput";
import Button from "@/components/button";

//special tbd
import { useContext } from "react";
import { UserContext } from "../../store/UserStore";
import Link from "next/link";

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
  };
  const resetFormField = () => {
    setFormFields(defaultValues);
  };

  const [formFields, setFormFields] = useState(defaultValues);
  const { email, password } = formFields;

  const handleFormOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormField();
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        alert("Email and password are incorrect");
      } else if (error.code === "auth/weak-password") {
        alert("weak password. please include at least six characters");
      }
      console.log(error);
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center  items-center gap-3 ">
      <div>This is sign in Page</div>
      <div>
        <Link href={"/"}>
          <span>back</span>
        </Link>
      </div>
      <form onSubmit={handleFormOnSubmit}>
        <FormInput
          label={"Email"}
          type="email"
          name="email"
          id=""
          required
          onChange={handleFormChange}
          value={email}
          className="P-2"
        ></FormInput>
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          id=""
          required
          onChange={handleFormChange}
          value={password}
          className="P-2"
        ></FormInput>
        <Button type={"submit"} buttonClass={"p-2"}>
          sign in
        </Button>
        <Button type={"button"} buttonClass={"p-2"} onClick={logGoogleUser}>
          sign in with google
        </Button>
      </form>
      <div>do not have an account </div>
      <Link href={"/signUpForm"}>
        <li>sign up </li>
      </Link>
    </div>
  );
};

export default SignIn;
