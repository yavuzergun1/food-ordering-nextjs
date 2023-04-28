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

type Product = {
  category: string;
  createdAt: string;
  desc: string;
  extraOptions: {
    name: string;
    price: number;
    _id: string;
  }[];
  img: string;
  prices: number[];
  title: string;
  updatedAt: string;
    _id: string;
};

type Category = {
  _id: string;
  title: string;
  data: {
    title: string;
    _id: string;
  };
};