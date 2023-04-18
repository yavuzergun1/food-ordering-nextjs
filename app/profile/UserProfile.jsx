"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const path = useSelectedLayoutSegment();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:mt-14 lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0">
    
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "account" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/profile/account")}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "password" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/profile/password")}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "orders" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/profile/orders")}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}
          >
            <i className="fa fa-sign-out"></i>
            <button onClick={handleSignOut} className="ml-1">
              Exit
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export async function getUser(userId) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
    );
    // console.log(res?.data);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
}
export default Profile;
