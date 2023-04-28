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

type ExtraOption = {
  name: string;
  price: number;
  _id: string;
  id: string
};

type Product = {
  category: string;
  createdAt: string;
  desc: string;
  extraOptions: ExtraOption[];
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

type Inputs = {
  _id?: string;
  name?: string;
  type?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  job?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  touched?: string;

};

type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: string;
  job: string;
  phoneNumber: string;
  null: any
}

type Order = {
  address: string;
  createdAt: string;
  customer: string;
  email: string;
  method: number;
  status: number;
  total: number;
  updatedAt: string;
  __v: number;
  _id: string;
}