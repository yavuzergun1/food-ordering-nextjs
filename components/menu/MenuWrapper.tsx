"use client";

import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

type MenuWrapperProps = {
  categories: Category[];
  products: Product[];
  title: string
}

function MenuWrapper({categories, products}: MenuWrapperProps) {
  const router = useRouter();

  const params= useSearchParams()?.get("category");
  // console.log(params);
//  router.push(`/menu?category=${title}`);

  // console.log(products[0]?.category);
  const handleClick = (title: string) => {
    // console.log(title);
    const url = `/menu?category=${title}`;
    router.push(url);
  };

  const filteredProducts = products?.filter(
    params !== "All"
      ? (product) => product?.category == params
      : (product) => product?.category == product?.category
  );

  // console.log("filtered", filteredProducts);
  return (
    <div className="container mx-auto min-h-screen mb-16">
      <div className="flex flex-col  items-center w-full">
        <Title addClass="text-[40px] text-primary">Our Menu</Title>
        <div className="mt-10">
          {categories.length > 0 && (
            <button
              onClick={() => handleClick("All")}
              className={`px-6 py-2 ${
                params === "All" ? " bg-secondary rounded-3xl text-white" : null
              } `}
            >
              All
            </button>
          )}
          {categories?.map((cat) => {
            return (
              <React.Fragment key={cat._id}>
                <button
                  onClick={() => handleClick(cat.title?.toLowerCase())}
                  className={`px-6 py-2 ${
                    params === cat.title.toLowerCase()
                      ? " bg-secondary rounded-3xl text-white"
                      : null
                  } `}
                >
                  {cat.title}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {filteredProducts?.map((product) => (
          <MenuItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default MenuWrapper;
