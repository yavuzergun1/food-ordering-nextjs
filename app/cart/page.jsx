"use client";
import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("cart items", cartItems);
  
  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  PRODUCT
                </th>
                <th scope="col" className="py-3 px-6">
                  SIZE
                </th>
                <th scope="col" className="py-3 px-6">
                  EXTRAS
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.products.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary "
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                      <Image src={item.img} alt="" width={50} height={50} />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {item.sizeName}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {item.extras &&
                        item.extras
                          .map((extraItem) => extraItem.name)
                          .join("/ ")}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ${item.price ? item.price : item.prices[0]}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full   md:text-start !text-center">
          <Title addClass="text-[40px]">CART TOTAL</Title>

          <div className="mt-6">
            <b>Total: </b>${cartItems.total}
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              onClick={() => dispatch(reset())}
            >
              CHECKOUT NOW!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
