import React from "react";
import Campaigns from "../components/ui/Campaigns";
import Carousel from "../components/ui/Carousel";
import MenuWrapper from "../components/menu/MenuWrapper";
import About from "../components/About";
import Input from "../components/form/Input";

const page = () => {
  return (
    <div className="font-dancing text-primary">
      <Carousel />
      <Campaigns />
      <MenuWrapper />
      <About />
      <div className="p-20 container mx-auto">
        <Input />
      </div>
    </div>
  );
};

export default page;
