type CartItem = {
  _id: string;
  category: string;
  createdAt: string;
  desc: string;
  extraOptions: {
    name: string;
    price: number;
    _id: string;
  }[];
  extras: {
    name: string;
    price: number;
    _id: string;
  }[];
  img: string;
  price: number;
  prices: number[];
  quantity: number;
  sizeName: string;
  title: string;
  updatedAt: string;
  __v: number;
};
