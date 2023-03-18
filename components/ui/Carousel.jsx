"use client";
import Image from "next/image";
import Title from "./Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className=" w-full h-[calc(100vh_-_120px)] relative ">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src="/assets/png/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-5xl">Best Restaurant Ever</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-5xl">Order now!</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
