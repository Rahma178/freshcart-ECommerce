"use client";

// import { useWishlist } from "@/context/WishlistContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { WishlistButton } from "@/app/_Component/WishlistButton";
import { useWishlist } from "../context/WishlistContext";


export default function WishlistPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/Wishlist");
      if (!res.ok) throw new Error("failed to fetch wishlist");
      return res.json();
    },
  });

  const products = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <span className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-green-500 py-10 px-6 mb-8">
        <div className="container mx-auto flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <span className="text-white text-2xl">❤️</span>
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">My Wishlist</h1>
            <p className="text-white/80 text-sm mt-1">
              {products.length} saved products
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-5">
                <span className="text-4xl">❤️</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Save items you love by clicking the heart icon
            </p>
            <Link
              href="/shop"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product: any) => (
              <div key={product._id} className="relative">
                <WishlistButton productId={product._id} />
                <Link
                  href={`/products/${product._id}`}
                  className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white group block"
                >
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">⭐</span>
                      <span className="text-xs text-gray-500">
                        {product.ratingsAverage} ({product.ratingsQuantity})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-green-600 font-bold text-sm">
                        {product.price} EGP
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}