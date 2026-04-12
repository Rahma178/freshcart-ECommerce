"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist } from "@/app/_Component/ProductItem/actions/addToWishlist.actions";
import { removeFromWishlist } from "@/app/_Component/ProductItem/actions/removeFromWishlist.actions";

type WishlistContextType = {
  wishlistIds: string[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  isLoading: boolean;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlistIds: [],
  isInWishlist: () => false,
  toggleWishlist: () => {},
  isLoading: false,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/Wishlist");
      if (!res.ok) throw new Error("failed to fetch wishlist");
      return res.json();
    },
  });

  const wishlistIds: string[] = data?.data?.map((p: any) => p._id) ?? [];

  const { mutate: addMutate } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const { mutate: removeMutate } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  function toggleWishlist(id: string) {
    if (wishlistIds.includes(id)) {
      removeMutate(id);
    } else {
      addMutate(id);
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, isInWishlist: (id) => wishlistIds.includes(id), toggleWishlist, isLoading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);