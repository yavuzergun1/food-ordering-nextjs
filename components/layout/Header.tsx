"use client";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";
import Search from "../ui/Search";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSelectedLayoutSegment } from "next/navigation";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state: any) => state.cart);
  const path = useSelectedLayoutSegment();
  // console.log("path", path);

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  return (
    <nav
      className={`h-[5.5rem] z-50  w-full ${
        path === "/" ? "bg-transparent" : "bg-secondary"
      }`}
    >
      <div className="container mx-auto text-white flex justify-between items-center h-full">
        <div className="logo-container relative h-[5.5rem]  w-48 lg:w-60">
          <Link href="/">
            <Image
              src="/assets/png/fooder logo4.png"
              alt="logo"
              fill
              priority
            />
          </Link>
        </div>
        <div
          className={`font-josefin sm:static absolute top-0  left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "/" && "text-primary"
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "menu" && "text-primary"
              }`}
            >
              <Link href="/menu">Menu</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "about" && "text-primary"
              }`}
            >
              <Link href="/about">About</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "reservation" && "text-primary"
              }`}
            >
              <Link href="/reservation">Book Table</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-x-4 items-center">
          <Link href="auth/login">
            <span>
              <FaUserAlt
                className={`hover:text-primary transition-all cursor-pointer ${
                  path === ("auth" || "profile") && "text-primary"
                }`}
                size={18}
              />
            </span>
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart
                className={`hover:text-primary transition-all cursor-pointer ${
                  path === "cart" && "text-primary"
                }`}
                size={18}
              />
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch
              className="hover:text-primary transition-all cursor-pointer"
              size={18}
            />
          </button>
          {/* <a href="#" className="md:inline-block hidden sm">
            <button className="btn-primary">Order Online</button>
          </a> */}
          <button className="sm:hidden inline-block">
            {/* <GiHamburgerMenu className="text-xl hover:text-primary transition-all" /> */}
          </button>
          <div className="hamburger-menu relative w-full sm:hidden inline-block ">
            <input
              type="checkbox"
              checked={isOpen}
              onChange={handleMenuClick}
              className="hidden"
              id="menuToggle"
            />
            <label
              htmlFor="menuToggle"
              className={`block text-sm cursor-pointer ${
                isOpen && "relative z-20 "
              }`}
            >
              <span
                className={`block w-5 h-[3px] mb-[3px] ${
                  isOpen
                    ? "bg-gray-500 relative z-20 rotate-45 translate-y-[5px] transition-all"
                    : "bg-white z-50 transition-all"
                }`}
              ></span>
              <span
                className={`block  w-5 h-[3px] mb-[3px] ${
                  isOpen
                    ? "transition-all hidden"
                    : "bg-white z-50 transition-all"
                }`}
              ></span>
              <span
                className={`block  w-5 h-[3px] mb-1 ${
                  isOpen
                    ? "bg-gray-500 relative z-20 -rotate-45 -translate-y-[1px] transition-all "
                    : "bg-white z-50 transition-all"
                }`}
              ></span>
            </label>
            <div
              className={`absolute flex flex-col -top-10 left-0 h-screen z-10 bg-white shadow-lg p-4 transition-all duration-300 ease-in-out ${
                isOpen ? "-translate-x-52 w-screen" : "translate-x-52"
              }`}
            >
              <Link
                href="/"
                onClick={handleMenuClick}
                className="my-2 text-gray-800 mt-16 font-medium hover:text-primary"
              >
                Home
              </Link>
              <Link
                onClick={handleMenuClick}
                href="/menu"
                className="my-2 text-gray-800 font-medium hover:text-primary"
              >
                Menu
              </Link>
              <Link
                onClick={handleMenuClick}
                href="/about"
                className="my-2 text-gray-800 font-medium hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/reservation"
                onClick={handleMenuClick}
                className="my-2 text-gray-800 font-medium hover:text-primary"
              >
                Book Table
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </nav>
  );
};
export default Header;
