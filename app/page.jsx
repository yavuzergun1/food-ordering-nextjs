import React from "react";
import Campaigns from "../components/ui/Campaigns";
import Carousel from "../components/ui/Carousel";
import MenuWrapper from "../components/menu/MenuWrapper";
import About from "../components/About";
import Reservation from "../components/Reservation";
import Comments from "../components/comments/Comments";

const page = () => {
  return (
    <div className="font-dancing text-primary">
      <Carousel />
      <Campaigns />
      <MenuWrapper />
      <About />
      <Reservation />
      <Comments/>
    </div>
  );
};

export default page;
