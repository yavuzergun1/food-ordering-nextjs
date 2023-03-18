import React from "react";
import Title from "../ui/Title";
import CommentItem from "./CommentItem";

const Comments = () => {
  return (
    <div className="container mx-auto my-20">
      <Title addClass="text-[40px] text-center">What Says Our Comments</Title>
      <div className="flex gap-x-10">
        <CommentItem imgSrc="/assets/png/client1.jpg" />
        <CommentItem imgSrc="/assets/png/client2.jpg" />
      </div>
    </div>
  );
};

export default Comments;
