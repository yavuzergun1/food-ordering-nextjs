"use client";

import Image from "next/image";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import axios from "axios";
import AddProduct from "../../../components/admin/AddProduct";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const path = useSelectedLayoutSegment();
  const [isProductModal, setIsProductModal] = useState(false);

  const logOut = async () => {
    try {
      if (confirm("Are you sure you want to log out?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          router.push("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src="/assets/png/admin.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">Admin</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "products" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/adminprofile/products")}
          >
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 ">Products</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "orders" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/adminprofile/orders")}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "categories" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/adminprofile/categories")}
          >
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1">Categories</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "footer" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/adminprofile/footer")}
          >
            <i className="fa fa-window-maximize"></i>
            <button className="ml-1">Footer</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "exit" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/")}
          >
            <i className="fa fa-sign-out"></i>
            <button onClick={logOut} className="ml-1">
              Exit
            </button>
          </li>
        </ul>
      </div>
            {isProductModal && (
              <AddProduct setIsProductModal={setIsProductModal} />
            )}
        <button
          type="button"
          className="btn-primary !w-12 !h-12 rounded-full !p-0 -pt-5 text-center absolute top-36 right-10 text-4xl"
          onClick={() => setIsProductModal(true)}
        >
          <p className="-mt-2">+</p>
        </button>
    </div>
  );
};
export default Profile;
