"use client";

import React from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Title from "../../../components/ui/Title";
import { addProduct } from "../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ params }) => {
  const [prices, setPrices] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState();
  const [extras, setExtras] = useState([]);
  const [sizeName, setSizeName] = useState<string>("Small");

  const cart = useSelector((state) => state.cart);

  // console.log("CART", cart);
  const dispatch = useDispatch();

  const fetcher = async () =>
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
    fetcher
  );
  // console.log("data", data);
  const food = data;

  useEffect(() => {
    // Call setPrices function with data.prices as argument
    if (data) {
      setPrices(data.prices);
      setPrice(data.prices[0]);
      setExtraItems(data.extraOptions);
    }
  }, [data]);

  if (error) return console.log(error);
  if (isLoading) return (
    <div className="flex w-full items-center m-auto justify-center h-screen">
      <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
    </div>
  );

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
    setSizeName(
      sizeIndex === 0 ? "Small" : sizeIndex === 1 ? "Medium" : "Large"
    );
  };
  const changePrice = (number) => {
    // console.log(number);
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, sizeName, price, quantity: 1 }));
  };

  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap ">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto ">
        <Image src={food?.img} alt="" fill className="object-contain" />
      </div>
      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">{food?.title}</Title>
        <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
          ${price}
        </span>
        <p className="text-sm my-4 md:pr-24">{food?.desc}</p>
        <div>
          <h4 className="text-xl font-bold">
            {food.category === "pizza" ? "Choose the size" : null}
          </h4>
        
            <div className="flex items-center gap-x-20 md:justify-start justify-center">
              <div
                className="relative w-8 h-8 cursor-pointer"
                onClick={() => handleSize(0)}
              >
                <Image src="/assets/png/size.png" alt="" fill />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Small
                </span>
              </div>
              <div
                className="relative w-12 h-12 cursor-pointer"
                onClick={() => handleSize(1)}
              >
                <Image src="/assets/png/size.png" alt="" fill />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Medium
                </span>
              </div>
              <div
                className="relative w-16 h-16 cursor-pointer"
                onClick={() => handleSize(2)}
              >
                <Image src="/assets/png/size.png" alt="" fill />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Large
                </span>
              </div>
            </div>
       
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {extraItems?.map((item) => (
            <label className="flex items-center gap-x-1" key={item._id}>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.name}</span>
            </label>
          ))}
        </div>
        <button className="btn-primary" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Page;
