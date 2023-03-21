"use client";

import Image from "next/image";
import { useState } from "react";
import Title from "../../components/ui/Title";

const itemsExtra = [
  {
    id: 1,
    name: "Ketchup",
    price: 1,
  },
  {
    id: 2,
    name: "Mayonnaise",
    price: 2,
  },
  {
    id: 3,
    name: "Chilli Sauce",
    price: 3,
  },
];

const ProductDetails = () => {
  const [prices, setPrices] = useState([10, 20, 30]);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState([]);
  console.log(extraItems);
  const handleSize = (sizeIndex) => {
    const priceGap = prices[sizeIndex] - prices[size];
    console.log(priceGap);
    setSize(sizeIndex);
    changePrice(priceGap);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      const priceGap = item.price;
      changePrice(priceGap);
      setExtraItems([...extraItems, item.name]);
    } else {
      const priceGap = -item.price;
      changePrice(priceGap);
      const filteredExtra = extraItems.filter(
        (extraItem) => extraItem !== item.name
      );
      setExtraItems(filteredExtra);
    }
  };
  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap ">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto">
        <Image
          src="/assets/png/f1.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">Good Pizza</Title>
        <span className="text-secondary text-sm my-4 inline-block">
          <div>
            Size : {size === 0 ? "small" : size === 1 ? "medium" : "large"}
          </div>
          <div>Extra: {extraItems.join(" - ")}</div>
          Cost: <span className="text-primary font-bold text-lg">{price}$</span>
        </span>
        <p className="text-sm my-4 md:pr-24">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          fugit corporis ex laboriosam tenetur at ad aspernatur eius numquam
          molestiae.
        </p>
        <div>
          <h4 className="text-xl font-bold">Choose the size</h4>
          <div className="flex items-center gap-x-20 md:justify-start justify-center">
            <div
              onClick={() => handleSize(0)}
              className="relative w-8 h-8 cursor-pointer"
            >
              <Image src="/assets/png/size.png" alt="" fill />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Small
              </span>
            </div>
            <div
              onClick={() => handleSize(1)}
              className="relative w-12 h-12 cursor-pointer"
            >
              <Image src="/assets/png/size.png" alt="" fill />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Medium
              </span>
            </div>
            <div
              onClick={() => handleSize(2)}
              className="relative w-16 h-16 cursor-pointer"
            >
              <Image src="/assets/png/size.png" alt="" fill />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Large
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {itemsExtra.map((item) => (
            <label className="flex items-center gap-x-1" key={item.id}>
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.name}</span>
            </label>
          ))}
        </div>
        <button className="btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
