"use client";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import Search from "../ui/Search";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(true);
  return (
    <div className="h-[7.5rem] bg-secondary font-josefin">
      <div className="container mx-auto text-white flex justify-between items-center h-full">
        <img
          src="assets/png/fooder logo.png"
          alt=""
          className="h-[5.5rem] translate-y-0"
        />
        <nav>
          <ul className="flex gap-x-3">
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
        </nav>
        <div className="flex gap-x-4 items-center">
          <a href="#">
            <FaUserAlt className=" hover:text-primary cursor-pointer transition-all" />
          </a>
          <a href="#">
            <FaShoppingCart className=" hover:text-primary cursor-pointer transition-all" />
          </a>
          <a href="#">
            <FaSearch className=" hover:text-primary cursor-pointer transition-all" />
          </a>
          <a href="#">
            <button
              onClick={() => setIsSearchModal(!isSearchModal)}
              className="btn-primary font-josefin font-bold"
            >
              Order Online
            </button>
          </a>
        </div>
      </div>
      {isSearchModal && (
        <div>
          {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
        </div>
      )}
    </div>
  );
};

export default Header;
