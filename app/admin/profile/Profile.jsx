"use client";

import Image from "next/image";
import {
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const path = useSelectedLayoutSegment();
  console.log(path);
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
            onClick={() => router.push("/admin/profile/products")}
          >
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 ">Products</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "orders" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/profile/orders")}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "categories" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/profile/categories")}
          >
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1">Categories</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              path === "footer" && "bg-primary text-white"
            }`}
            onClick={() => router.push("/admin/profile/footer")}
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
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Profile;
