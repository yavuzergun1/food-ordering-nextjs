"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type ButtonProps = {
  children: string;
  order: Order;
};

const Button = ({ children, order }: ButtonProps) => {
  console.log(order);

  const router = useRouter();
  const status: string[] = ["preparing", "on the way", "delivered"];

  const handleStatus = async (id: string) => {
    const currentStatus = order.status;
    console.log(order);

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${order?._id}`,
        {
          status: currentStatus + 1,
        }
      );
      console.log(res);

      router.push("/admin/adminprofile/orders");
    } catch (err) {
      console.log(err);
    }
  };
  return (
   <button
  className="btn-primary !bg-success"
  disabled={order?.status > 1}
  onClick={() => handleStatus(order?._id)}
>
  {children}
</button>
  );
};

export default Button;
