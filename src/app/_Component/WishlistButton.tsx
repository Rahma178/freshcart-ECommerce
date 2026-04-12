"use client";
import { FaHeart } from "react-icons/fa6";
import { useWishlist } from "../context/WishlistContext";
// import { useWishlist } from "@/context/WishlistContext";


export function WishlistButton({ productId }: { productId: string }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); 
        toggleWishlist(productId);
      }}
      className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow hover:scale-110 transition-transform"
    >
      <FaHeart
        className={`text-lg transition-colors ${
          inWishlist ? "text-red-500" : "text-gray-300"
        }`}
      />
    </button>
  );
}