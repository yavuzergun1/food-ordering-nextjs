"use client";

import { useState, useEffect } from "react";
import Input from "../../../../components/form/Input";
import Title from "../../../../components/ui/Title";
import axios from "axios";
import useSWR from "swr";

type Category = {
  _id: string;
  title: string;
  data: {
    title: string;
    _id: string;
  };
};

const Category = () => {
  const [inputText, setInputText] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const fetcher = async (): Promise<Category[]> =>
    await axios
      .get<Category[]>(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher
  );

  useEffect(() => {
    data && setCategories(data);
  }, [data]);

  if (error) {
    return console.log(error);
  }
  if (isLoading)
    return (
      <div className="flex w-full items-center m-auto justify-center h-screen">
        <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
      </div>
    );

  const addCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      // console.log("res", res);
       const newCategory: Category = {
         _id: res.data._id,
         title: inputText,
         data: { _id: "", title: "" },
       };
      setCategories([...categories, newCategory]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      if (confirm("Are you sure you want to delete this category?")) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(categories.filter((cat:Category) => cat._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Category</Title>
      <div className="mt-5">
        <div className="flex gap-4 flex-1 items-center">
          <Input
            placeholder="Add a new Category..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button className="btn-primary" onClick={addCategory}>
            Add
          </button>
        </div>
        <div className="mt-10 max-h-[250px] overflow-auto pb-4">

          {categories?.map(
            (category:Category, index:number) => (
              <div className="flex justify-between mt-4" key={index}>
                <b className="text-xl">
                  {category.title}
                </b>
                <button
                  className="btn-primary !bg-danger"
                  onClick={(e) =>
                    deleteCategory(
                      e,
                      category.data ? category.data._id : category._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
