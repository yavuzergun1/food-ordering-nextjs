"use client";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../ui/Search";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);

  return (
    <div className="h-[7.5rem] bg-secondary font-josefin px-5 md:px-0">
      <div className="container mx-auto text-white flex justify-between items-center h-full">
        <div className="logo-container relative h-[5.5rem]  w-48 lg:w-60">
          <Image src="/assets/png/fooder logo4.png" alt="logo" fill />
        </div>
        <nav
          className={`sm:hidden md:flex md:static absolute top-0 left-0 transition-all md:translate-x-0 sm:w-auto sm:h-auto w-full h-full sm:text-white text-black sm:bg-transparent bg-white sm:flex-col  ${
            isMenuModal === true
              ? "grid translate-x-0 place-content-center"
              : "translate-x-full "
          }`}
        >
          <ul className="md:flex-row flex flex-col text-center gap-x-3">
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">Home</a>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">Menu</a>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">About</a>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <a href="">Book Table</a>
            </li>
          </ul>
          {isMenuModal && (
            <button
              className="absolute  top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <RiCloseFill size={25} className=" transition-all md:hidden" />
            </button>
          )}
        </nav>
        <div className="flex gap-x-4 items-center">
          <a href="#">
            <FaUserAlt className=" hover:text-primary cursor-pointer transition-all" />
          </a>
          <a href="#">
            <FaShoppingCart className=" hover:text-primary cursor-pointer transition-all" />
          </a>
          <a href="#">
            <FaSearch
              onClick={() => setIsSearchModal(!isSearchModal)}
              className=" hover:text-primary cursor-pointer transition-all"
            />
          </a>
          <a href="#" className="md:inline-block hidden ">
            <button className="btn-primary font-josefin font-bold">
              Order Online
            </button>
          </a>
          <button
            className="md:hidden inline-block"
            onClick={() => setIsMenuModal(true)}
          >
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchModal && (
        <div>
          <Search setIsSearchModal={setIsSearchModal} />
        </div>
      )}
    </div>
  );
};

export default Header;
