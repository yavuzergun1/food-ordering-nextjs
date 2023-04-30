import React from "react";
import Orders from "./Orders";

async function page () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, { cache: "no-cache" });
  const orders= await res.json()
  console.log("orders", orders);

  return (
    <div>
      {
    orders && <Orders orders={orders} />
      }
    </div> 
  );
};

export default page;
