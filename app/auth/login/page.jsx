"use client";

import { useFormik } from "formik";
import Link from "next/link";
import Input from "../../../components/form/Input";
import Title from "../../../components/ui/Title";
import { loginSchema } from "../../../schema/login";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const {data:session} = useSession();
  const router = useRouter();

  if (session) {
    router.push("profile")
  }

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: true, email, password };
    try {
      const res = await signIn("credentials", options);
      // console.log("res", res);
      actions.resetForm();
      if (res.status === 200) {
        actions.resetForm();

        push("/profile/account");
      } else if (res.response.status === 400) {
        console.log("resadmin", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Session",session);
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit,
      validationSchema: loginSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];

  return (
    <div className="container mx-auto">
      <form
        className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px] mb-6 text-primary">Login</Title>
        <div className="flex flex-col gap-y-2 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full gap-y-3 mt-6">
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="btn-primary !bg-primary"
          >
            <i className="fa-brands fa-google mr-2 text-lg"></i>
            Google
          </button>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="btn-primary !bg-secondary"
          >
            <i className="fa-brands fa-github mr-2 text-lg"></i>
            GITHUB
          </button>
          <Link href="/auth/register">
            <span className="text-sm underline cursor-pointer text-secondary">
              Create an Account
            </span>
          </Link>
          <Link
            className="text-sm underline cursor-pointer text-secondary"
            href="/admin"
          >
            Admin Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
