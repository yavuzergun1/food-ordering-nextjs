"use client";

import React from "react";
import Input from "../../../components/form/Input";
import Title from "../../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../../schema/profile";
import ShowAccount from "./ShowAccount";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getUser } from "../UserProfile";
import { useRouter } from "next/navigation";

const Account = () => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const session = useSession();
  const router = useRouter();
  // console.log("SESSION", session);
  const [user, setUser] = useState();
  const userId = session.data?.id;
  // console.log(userId);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
        );
        // console.log(res?.data);
        setUser(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [session, userId]);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fooder");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dz2y5zsex/image/upload",
        data
      );
      // console.log(uploadRes);

      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        values,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        newProduct
      );

      if (res.status === 200) {
        // toast.success("Profile updated successfully");
        setUser(res?.data);
      }

      // console.log("added product", res.data);
    } catch (err) {
      console.log(err);
      if (
        err.response.data.error.message === "Unsupported source URL: undefined"
      ) {
        alert("Please upload an image");
      } else {
        alert("Something went wrong", err);
      }
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        address: user?.address || "",
        job: user?.job || "",
      },
      validationSchema: profileSchema,
      onSubmit,
    });

  // get photo from file input and set it to imageSrc
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
    // console.log(imageSrc);
  };

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Your Address",
      value: values.address,
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeholder: "Your Job",
      value: values.job,
      errorMessage: errors.job,
      touched: touched.job,
    },
  ];

  return (
    <div className="flex flex-col justify-start items-start w-full ">
      <form
        className="lg:p-8 flex-1 lg:mt-0 mt-5 w-full"
        onSubmit={handleSubmit}
      >
        <Title addClass="text-[40px]">Account Settings</Title>
        <div className="flex flex-col text-sm mt-6">
          <label className="flex gap-2 items-center">
            <input
              type="file"
              onChange={(e) => handleOnChange(e)}
              className="hidden"
            />
            <button className="btn-primary cursor-pointer !rounded-none !bg-blue-600 pointer-events-none">
              Choose an Image
            </button>
            {imageSrc && (
              <div>
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img src={imageSrc} alt="" className="w-12 h-12 rounded-full" />
              </div>
            )}
          </label>
        </div>
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
      <ShowAccount user={user} />
    </div>
  );
};

export default Account;
