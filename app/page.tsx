import React from "react";
import Campaigns from "../components/ui/Campaigns";
import Carousel from "../components/ui/Carousel";
import MenuWrapper from "../components/menu/MenuWrapper";
import About from "../components/About";
import Reservation from "../components/Reservation";
import Comments from "../components/comments/Comments";
import { getCategories, getProducts } from "@/Data";


const page = async () => {
  // const products = getProducts()
  // const categories = getCategories()
  // const result = await Promise.all([products, categories]);

  return (
    <div className="font-dancing text-primary">
      <Carousel />
      <Campaigns />
      {/* <MenuWrapper title="all" categories={result[1]} products={result[0]} /> */}
      <About />
      <Reservation />
      <Comments />
    </div>
  );
};

export default page;
