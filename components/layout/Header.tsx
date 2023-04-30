"use client";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Image from "next/image";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Search from "../ui/Search";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state: any) => state.cart);
  const router = useRouter();
  const path = useSelectedLayoutSegment();
  // console.log("path", path);
  
  return (
    <div
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
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden  ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "/" && "text-primary"
              }`}
            >
              <Link onClick={() => setIsMenuModal(false)} href="/">
                Home
              </Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "menu" && "text-primary"
              }`}
            >
              <Link onClick={() => setIsMenuModal(false)} href="/menu">
                Menu
              </Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "about" && "text-primary"
              }`}
            >
              <Link onClick={() => setIsMenuModal(false)} href="/about">
                About
              </Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                path === "reservation" && "text-primary"
              }`}
            >
              <Link onClick={() => setIsMenuModal(false)} href="/reservation">
                Book Table
              </Link>
            </li>
          </ul>
          {isMenuModal && (
            <button
              className="absolute  top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          )}
        </nav>
        <div className="flex gap-x-4 items-center">
          <Link href="/auth/login">
            <span>
              <FaUserAlt
                className=" hover:text-primary cursor-pointer transition-all"
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
          <button
            className="sm:hidden inline-block"
            onClick={() => setIsMenuModal(true)}
          >
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};
export default Header;
