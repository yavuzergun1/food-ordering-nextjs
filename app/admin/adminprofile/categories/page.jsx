"use client";

import { useState, useEffect } from "react";
import Input from "../../../../components/form/Input";
import Title from "../../../../components/ui/Title";
import axios from "axios";
import useSWR from "swr";

const Category = () => {
  const [inputText, setInputText] = useState("");
  const [categories, setCategories] = useState([]);

  const fetcher = async () =>
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher
  );
  if (error) return console.log(error);
  if (isLoading) return (
    <div className="flex w-full items-center m-auto justify-center h-screen">
      <div className="animate-spin w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full"></div>
    </div>
  );

  const addCategory = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { title: inputText }
      );
      setCategories([...data, res.data]);
      setInputText("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (e, id) => {
    e.preventDefault();
    try {
      if (confirm("Are you sure you want to delete this category?")) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
        );
        setCategories(data.filter((cat) => cat._id !== id));
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
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <button className="btn-primary" onClick={addCategory}>
            Add
          </button>
        </div>
        <div className="mt-10 max-h-[250px] overflow-auto pb-4">
          {/* if first opened page, use data, if any change like add or delete, use categories */}
          {(categories.length > 0 ? categories : data).map(
            (category, index) => (
              <div className="flex justify-between mt-4" key={index}>
                <b className="text-xl">
                  {category.data ? category.data.title : category.title}
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
