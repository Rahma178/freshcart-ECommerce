"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/freshcart-logo.49f1b44d.svg";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigationMenuDemo() {
  const { data, status } = useSession();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/Cart");
      if (!res.ok) throw new Error("failed to fetch cart");
      return res.json();
    },
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/Wishlist");
      if (!res.ok) throw new Error("failed to fetch wishlist");
      return res.json();
    },
  });

  const categories = [
    { name: "All Categories", path: "/shop" },
    { name: "Electronics", path: "/shop" },
    { name: "Women's Fashion", path: "/shop" },
    { name: "Men's Fashion", path: "/shop" },
    { name: "Beauty & Health", path: "/shop" },
  ];

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 text-gray-500 text-xs py-2 px-10 md:px-20 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>📦 Free Shipping on Orders 500 EGP</span>
          <span>🆕 New Arrivals Daily</span>
        </div>
        <div className="flex items-center gap-4">
          <span>📞 +1 (800) 123-4567</span>
          <span>✉️ support@freshcart.com</span>
          {status === "authenticated" && (
            <>
              <span className="text-gray-700 font-medium">
                👤 {data?.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="hover:text-green-600 transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-b py-4 px-10 md:px-20 flex items-center justify-between sticky top-0 bg-white z-50 shadow-sm">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="fresh-cart-logo" className="h-8 w-auto" />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-10 max-w-xl">
          <div className="flex w-full border border-gray-200 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-green-500 hover:bg-green-600 transition-colors px-4 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {status === "authenticated" ? (
            <>
              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6 mr-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Shop
                </Link>

                {/* Categories Dropdown */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-medium hover:text-green-600 p-0 bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                        Categories
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-48 p-2">
                          {categories.map((cat) => (
                            <li key={cat.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={cat.path}
                                  className="block px-3 py-2 text-sm rounded-md hover:bg-green-50 hover:text-green-600 transition-colors"
                                >
                                  {cat.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Link
                  href="/brands"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                >
                  Brands
                </Link>
              </div>

              {/* Support */}
              <div className="hidden md:flex flex-col items-center text-xs text-gray-500 mr-2 border-l pl-4">
                <span className="text-gray-700 font-medium text-sm">Support</span>
                <span>24/7 Help</span>
              </div>

              {/* Wishlist */}
              <Link
                href="/whishList"
                className="relative p-2 hover:text-green-600 transition-colors"
              >
                <FaHeart className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
                {wishlistData?.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistData?.count}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:text-green-600 transition-colors"
              >
                <FaCartShopping className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
                {cartData?.numOfCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartData?.numOfCartItems}
                  </span>
                )}
              </Link>

              {/* User */}
              <button className="p-2 hover:text-green-600 transition-colors">
                <FaUser className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}