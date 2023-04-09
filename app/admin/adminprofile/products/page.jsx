import Title from "../../../../components/ui/Title";
import Image from "next/image";
import axios from "axios";
import Product from "../../../../components/admin/Product";

const Products = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = res.data;
  console.log(products);
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
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
        {products.map((product) => {
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
