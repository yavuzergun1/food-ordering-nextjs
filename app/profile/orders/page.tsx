"use client";
import React from "react";
import Title from "../../../components/ui/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const status = ["preparing", "on the way", "delivered"];
  // console.log(orders);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);
  const session = useSession();
  // console.log(orders);
  // console.log(session.data?.user.email);


  

  const userOrders = orders?.filter(
    (order) => order.email === session?.data?.user?.email
  );

  // console.log(loading);
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-[400px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                ADRESS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex w-full items-center m-auto justify-center h-screen">
                <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
              </div>
            ) : (
              userOrders?.map((order) => {
                return (
                  <React.Fragment key={order._id}>
                    <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary h-36 ">
                      <td className="py-4 px-6  font-medium  hover:text-white flex items-center gap-x-1 justify-center">
                        <span> {order?._id.substring(0, 6)}...</span>
                      </td>
                      <td className="py-4 h-32 px-6 max-w-md font-medium  hover:text-white">
                        {order.address}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order.createdAt}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {order.total}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        {status[order.status]}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
