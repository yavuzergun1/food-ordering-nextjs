"use client";

import Title from "../../../../components/ui/Title";
import Product from "../../../../components/admin/Product";
import useSWR from "swr";
import axios from "axios";


const Products = () => {
  const fetcher = async () =>
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    fetcher
  );


  if (error) return console.log(error);
  if (isLoading) return "Loading...";
  console.log("data", data);

  // useEffect(() => {
  //   // Call setPrices function with data.prices as argument
  //   if (data) {
  //     setPrices(data.prices);
  //     setPrice(data.prices[0]);
  //     setExtraItems(data.extraOptions);
  //   }
  // }, [data]);

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  // const products = await res.json();
  // console.log(products);

  return (
    <div className=" flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Products</Title>
      <div className="overflow-x-auto w-full mt-5">
        <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
          <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
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
            {data.map((product) => {
              return (
                <>
                  <Product product={product} />
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
