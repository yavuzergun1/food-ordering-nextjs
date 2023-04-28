"use client";

import React, { Suspense } from "react";
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
import Image from "next/image";

type File = {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const Account = () => {
  const [file, setFile] = useState<File | null>();
  const [imageSrc, setImageSrc] = useState<string | null>();
  const [user, setUser] = useState<User>();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log("SESSION", session);
  const userEmail = session?.data?.user?.email;
  const router = useRouter();

  console.log(user);
  useEffect(() => {
    const addGitHubToDB = async () => {
      router.refresh();
      try {
        setIsLoading(true);
        session.data &&
          (await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/githubRegister`,
            session.data.user
          ));
      } catch (err) {
        // console.log(err);
      }
      setIsLoading(false);
    };
    addGitHubToDB();
  }, [router, session]);

  useEffect(() => {
    const fetchData = async () => {
      if (userEmail) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/users/userFind?email=${userEmail}`;
        try {
          const response = await axios.get(url);
          const userData = response.data as User;
          setUser(userData);
        } catch (error) {
          console.error(error);
          setUser(null as any);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [session.status, isLoading]);

  const updatePhoto = async () => {
    if (user && file) {
      const data = new FormData();
      data.append("file", file as any);
      data.append("upload_preset", "fooder");
      try {
        setIsLoading(true);
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dz2y5zsex/image/upload",
          data
        );
        // console.log(uploadRes);

        const { url } = uploadRes.data;
        const newProduct = {
          image: url,
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
      }
    }
    setIsLoading(false);
  };

  const onSubmit = async (values: User, actions: any) => {
    if (user) {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
          values
        );
        console.log(res);
        if (res.status === 200) {
          setUser(res?.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      // @ts-ignore
      initialValues: {
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        address: user?.address || "",
        job: user?.job || "",
      },
      validationSchema: profileSchema,
      onSubmit,
    });

  // get photo from file input and set it to imageSrc
  const handleOnChange = (changeEvent: any) => {
    if (
      changeEvent.target &&
      changeEvent.target.files &&
      changeEvent.target.files[0]
    ) {
      const file = changeEvent.target.files[0];
      const reader = new FileReader();

      reader.onload = function (onLoadEvent) {
        if (onLoadEvent.target) {
          setImageSrc(onLoadEvent.target.result as string);
          setFile(changeEvent.target.files[0]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Your Full Name",
      value: values.name,
      errorMessage: errors.name,
      touched: touched.name,
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
  // console.log("isloading", isLoading);
  return (
    <div className="flex flex-col justify-start items-start w-full ">
      <Title addClass="text-[40px]">Account Settings</Title>
      <div className="relative h-48 flex flex-col items-center px-10 py-5 border border-b-0">
        <div className="relative w-28 h-28 rounded-full">
          {isLoading ? (
            <div className="flex w-full items-center m-auto justify-center h-full">
              <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
            </div>
          ) : (
            <Image
              src={user?.image ? user.image : "/assets/png/fooder logo4.png"}
              alt="client2 "
              fill
              className="object-contain rounded-full border"
            />
          )}
        </div>
        <b className="text-2xl mt-1">{user?.name} </b>
      </div>
      <form
        className="lg:p-8 flex-1 lg:mt-0 mt-5 w-full"
        onSubmit={handleSubmit}
      >
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
            {file && (
              <button className="pb-3 mt-4" type="button" onClick={updatePhoto}>
                Update Photo
              </button>
            )}
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
      {isLoading ? (
        <div className="flex w-full items-center m-auto justify-center h-full">
          <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
        </div>
      ) : (
       user && <ShowAccount user={user} />
      )}
    </div>
  );
};

export default Account;
