import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { Suspense, useState } from "react";

const MenuItem = ({ product }) => {
  const [price, setPrice] = useState(product.prices[0]);
  const dispatch = useDispatch();
  const handleClick = () => {
    // console.log(product);
    const sizeName = "Small";
    dispatch(addProduct({ ...product, sizeName, price, quantity: 1 }));
  };
  return (
    <div className="bg-secondary rounded-3xl">
      <div className="w-full  bg-[#f1f2f3] h-[210px] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl">
        <Link href={`/product/${product._id}`}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
              </div>
            }
          >
            <div className="relative w-36 h-36 hover:scale-110 transition-all">
              <Image src={product.img} priority alt="" fill />
            </div>
          </Suspense>
        </Link>
      </div>
      <div className="p-[25px] text-white">
        <h4 className="text-xl font-semibold">{product.title} </h4>
        <p className="text-[15px]">{product.desc}</p>
        <div className="flex justify-between items-center mt-4">
          <span>${product.prices[0]}</span>
          {/* if category is not pizza, show add to cart button */}

          <button
            onClick={handleClick}
            className="btn-primary !w-10 !h-10 !rounded-full !p-0 grid place-content-center"
          >
            <RiShoppingCart2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MenuItem;
