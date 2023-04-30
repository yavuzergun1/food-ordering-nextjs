"use client";

import React from "react";
import Input from "../../../components/form/Input";
import Title from "../../../components/ui/Title";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { newPasswordSchema } from "../../../schema/newPassword";
import axios from "axios";

type PasswordValues = {
  password: string;
  confirmPassword: string;
};

const Password = () => {
  const { data: session } = useSession();
  const userId = (session as any)?.id;

  const onSubmit = async (values: PasswordValues, actions: any) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        values
      );
      // console.log(res);
      actions.resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: newPasswordSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Confirm Password",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Password</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="btn-primary mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default Password;
