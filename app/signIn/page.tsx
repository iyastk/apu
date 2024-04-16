"use client";

import React, { useState } from "react";
import {
  auth,
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../utils/firebase";
import FormInput from "@/components/formInput";
import Button from "@/components/button";

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    createUserDocumentFromAuth(user);
  };

  const [formFields, setFormFields] = useState(defaultValues);
  const { email, password } = formFields;
  const handleFormOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      //   const response = await createAuthUserWithEmailAndPassword(
      //     email,
      //     password
      //   );
      //   const user = response?.user;
      //   await createUserDocumentFromAuth(user, { displayName });
      //   resetFormField();
    } catch (error: any) {
      //   if (error.code === "auth/email-already-in-use)") {
      //     alert("Email already exist");
      //   } else if (error.code === "auth/weak-password") {
      //     alert("weak password. please include at least six characters");
      //   }
      //   console.log(error);
    }
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormField = () => {
    setFormFields(defaultValues);
  };
  return (
    <div className="flex min-h-screen flex-col justify-center  items-center gap-3 ">
      <div>This is sign Up Page</div>
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
        <Button type={"submit"} buttonClass={"p-2"} onClick={logGoogleUser}>
          sign up with google
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
