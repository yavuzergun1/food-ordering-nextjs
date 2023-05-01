"use client";
import React from "react";
import Title from "../../../../components/ui/Title";
import Product from "../../../../components/admin/Product";
import { useState, useEffect } from "react";
import AddProduct from "../../../../components/admin/AddProduct";

const Products = () => {
  const [isProductModal, setIsProductModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  // console.log(categories);

  if (isLoading) {
    return (
      <div className="flex w-full items-center m-auto justify-center h-full">
        <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    );
  }
  return (
    <div className=" flex-1 lg:mt-0 mt-5">
      {isProductModal && (
        <AddProduct
          setIsProductModal={setIsProductModal}
          setProducts={setProducts}
        />
      )}
      <button
        type="button"
        className="btn-primary !w-12 !h-12 rounded-full !p-0 -pt-5 text-center absolute top-24 right-10 text-4xl"
        onClick={() => setIsProductModal(true)}
      >
        <p className="-mt-2">+</p>
      </button>
      <Title addClass="text-[40px]">Products</Title>
      <div className="overflow-x-auto w-full mt-5">
        <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
          <table className="w-full text-sm text-center text-gray-500 xl:min-w-[1000px]">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  IMAGE
                </th>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  TITLE
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  ACTION
                </th>
              </tr>
            </thead>
            {products?.map((product: Product, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Product product={product} setProducts={setProducts} />
                </React.Fragment>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
