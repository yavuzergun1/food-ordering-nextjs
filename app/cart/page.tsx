"use client";
import Image from "next/image";
import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSWR from "swr";



const Cart = () => {
 const { data: session }: { data?: Session | null } = useSession();

  const cart = useSelector((state: { cart: { products: CartItem[]; total: number } })=> state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  //@ts-ignore
  const email = session?.user.email;
  // console.log(cart.products);

  const fetcher = async (url:string) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data: user, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users/userFind?email=${email}`,
    fetcher
  );

  if (error) {
    return <div>Error</div>;
  }

  // console.log(user);

  const newOrder = {
    customer: user?.name,
    address: user?.address ? user?.address : "No address",
    email: user?.email,
    total: cart.total,
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
            toast.success("Your Order is Succesfully Completed", {
              autoClose: 1500,
            });
            //@ts-ignore
            dispatch(reset());
          }
        }
      } else {
        toast.error("Please login first.", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full">
          <div className="max-h-52 overflow-auto w-full">
            {cart?.products?.length > 0 ? (
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
                  {cart.products.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        className="transition-all bg-secondary border-gray-700 hover:bg-primary "
                      >
                        <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                          <Image src={item.img} alt="" width={50} height={50} />
                                   
                          <span>{item.title}</span>
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
            ) : (
              <p className="text-center font-semibold">The Cart is Empty...</p>
            )}
          </div>
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full   md:text-start !text-center">
          <Title addClass="text-[40px]">CART TOTAL</Title>

          <div className="mt-6">
            <b>Subtotal: </b>${cart.total} <br />
            <b className=" inline-block my-1">Discount: </b>$0.00 <br />
            <b>Total: </b>${cart.total}
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
