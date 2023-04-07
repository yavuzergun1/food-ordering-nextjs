"use client";

import { Fragment, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { toast } from "react-toastify";
import { GiCancel } from "react-icons/gi";
import axios from "axios";

const AddProduct = ({ setIsProductModal, categories }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [category, setCategory] = useState();
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const extraPrice = useRef();
  const extraName = useRef();

  // get photo from file input and set it to imageSrc
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
    console.log(imageSrc);
  };

  // upload photo to cloudinary and upload data to db
  const handleOnCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fooder");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dz2y5zsex/image/upload",
        data
      );
      console.log(uploadRes);

      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        desc,
        category: category?.toLowerCase(),
        prices,
        extraOptions,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );
      console.log("resdataaa",res.data);

      if (res.status === 200) {
        setIsProductModal(false);
        toast.success("Product created successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addExtraOptions = () => {
    if (extra) {
      const isExtra = extraOptions.find((option) => option.name === extra.name);
      console.log(isExtra);
      if (isExtra) {
        alert("Extra option already exists");
        return;
      }
      if (extra.name && extra.price) {
        setExtraOptions([...extraOptions, extra]);
        extraName.current.value = null;
        extraPrice.current.value = null;
        setExtra(null);
      }
    }
    console.log(extraOptions);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
    console.log("Prices", prices);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Add a New Product</Title>

            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={(e) => handleOnChange(e)}
                  className="hidden"
                />
                <button className="btn-primary cursor-pointer !rounded-none !bg-blue-600 pointer-events-none">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Title</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Write a title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Description</span>
              <textarea
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Write a title..."
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Select Category</span>
              <select
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Write a title..."
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Prices</span>
              <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="small"
                  onChange={(e) => changePrice(e, 0)}
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="medium"
                  onChange={(e) => changePrice(e, 1)}
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="large"
                  onChange={(e) => changePrice(e, 2)}
                />
              </div>
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Extra</span>
              <div className="flex  gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="text"
                  name="name"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="item"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                  ref={extraName}
                />
                <input
                  type="number"
                  name="price"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="price"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                  ref={extraPrice}
                />
                <button
                  className="btn-primary ml-auto"
                  onClick={addExtraOptions}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex gap-5">
                {extraOptions.map((extra, index) => {
                  return (
                    <Fragment key={index}>
                      {console.log(extra)}
                      <span
                        onClick={() =>
                          setExtraOptions(
                            extraOptions.filter((_, i) => i !== index)
                          )
                        }
                        className=" border border-orange-500 text-orange-500 p-1 rounded-xl text-xs cursor-pointer"
                      >
                        <span
                          key={extra.name}
                          className="flex  items-center"
                        ></span>
                        <span>{`${extra.name} - ${extra.price}$`}</span>
                      </span>
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary !bg-success"
                onClick={handleOnCreate}
              >
                Create
              </button>
            </div>
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
