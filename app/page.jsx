import React from "react";
import Campaigns from "../components/ui/Campaigns";
import Carousel from "../components/ui/Carousel";
import MenuWrapper from "../components/menu/MenuWrapper";
import About from "../components/About";
import Reservation from "../components/Reservation";
import Comments from "../components/comments/Comments";
import axios from "axios";

const page = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    cache: "force-cache",
  });
  const products = res.data;
  console.log("products", products);
  return (
    <div className="font-dancing text-primary">
      <Carousel />
      <Campaigns />
      <MenuWrapper products={products} />
      <About />
      <Reservation />
      <Comments />
    </div>
  );
};

export default page;
