"use client";

import Image from 'next/image';
import axios from 'axios';

const Product = ({ product }) => {
  console.log(product);

  const handleDelete = async () => {
    try {
      if (confirm("Are you sure you want to delete this product?")) {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`
        );
        if (res.status === 200) {
          // toast.success("Product Deleted!");
          getProducts();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
        <tbody>
          <tr className="transition-all bg-secondary border-gray-700 hover:bg-primary ">
            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
              <Image src="/assets/png/f1.png" alt="" width={50} height={50} />
            </td>
            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
             {product._id}
            </td>
            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
              {product.title}
            </td>
            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
              $ {product.prices[0]}
            </td>
            <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
              <button onClick={ handleDelete} className="btn-primary !bg-danger">Delete</button>
            </td>
          </tr>
        </tbody>
    
  );
}

export default Product