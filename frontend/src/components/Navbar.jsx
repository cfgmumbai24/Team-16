import { useState } from "react";
import logo from "../assets/logo2.png";
import search from "../assets/search.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#543310] text-white w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side with logo and search bar */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-4" />
            <div className="relative">
              <input
                type="text"
                placeholder="Search items"
                className="bg-[#8A7153] text-white px-4 py-2 rounded-md focus:outline-none w-64 sm:w-96"
              />
              <button className="absolute right-0 top-0 mt-3 mr-2">
                <img src={search} className="h-6 w-6" alt="Search Icon" />
              </button>
            </div>
          </div>

          {/* Middle spacer for responsive layout */}
          <div className="hidden md:flex md:flex-grow"></div>

          {/* Right side with menu links */}
          <div className="hidden md:flex md:items-center md:justify-end">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="/"
                className="hover:bg-[#8A7153] px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#categories"
                className="hover:bg-[#8A7153] px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
              </a>
              <a
                href="#aboutUs"
                className="hover:bg-[#8A7153] px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </a>
              <a href="/cart" className="hover:bg-[#8A7153] px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </a>
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#AF8F6F] inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#8A7153] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#AF8F6F] focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="hover:bg-[#8A7153] block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:bg-[#8A7153] block px-3 py-2 rounded-md text-base font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="hover:bg-[#8A7153] block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
