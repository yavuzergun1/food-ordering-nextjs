"use client";

import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function MenuWrapper() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const params = useSearchParams().get("category");
  console.log(products);
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const pro = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setCategories(res?.data.data);
        setProducts(pro?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, [params]);

  // console.log(products[0]?.category);
  const handleClick = (title) => {
    console.log(title);
    const url = `/menu?category=${title}`;
    router.push(url);
  };

  const filteredProducts = products?.filter(
    params !== "All"
      ? (product) => product?.category == params
      : (product) => product?.category == product?.category
  );
  
  console.log("filtered", filteredProducts);
  return (
    <div className="container mx-auto  mb-16">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-[40px] text-primary">Our Menu</Title>
        <div className="mt-10">
          <button
            onClick={() => handleClick("All")}
            className={`px-6 py-2 ${
              params === "All" ? " bg-secondary rounded-3xl text-white" : null
            } `}
          >
            All
          </button>
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
          <MenuItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default MenuWrapper;
