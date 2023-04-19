"use client";
import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  // console.log("cart items", cartItems);

  const userId = session.data?.id;
  if (!userId) {
     toast.error("Please login first");
   }
  
  const fetcher = async () =>
  await axios
  .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
  .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    fetcher
  );
  
  if (isLoading) return "Loading...";
  if (error) return toast.error("Please login first");
  
  const user = data;
  const newOrder = {
    customer: user?.fullName,
    email: user?.email,
    address: user?.address ? user?.address : "No address",
    total: cartItems.total,
    method: 0,
  };

  const createOrder = async () => {
    try {
      if (session) {
        if (confirm("Are you sure to order?")) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );
          if (res.status === 201) {
            router.push(`/order/${res.data._id}`);
            dispatch(reset());
            toast.success("Order created successfully", {
              autoClose: 1000,
            }
            );
            // console.log(res);
          }
        }
      } else {
       toast.error("Please login first");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
              onClick={createOrder}
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
