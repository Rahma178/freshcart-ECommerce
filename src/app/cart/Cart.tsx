"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { deleteItemCart } from "../_Component/ProductItem/actions/deleteCart.actions";
import { updateCart } from "../_Component/ProductItem/actions/updataCart.actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { clearCart } from "../_Component/ProductItem/actions/clearItems.actions";
import Link from "next/link";

type UpdateCartVars = {
  productId: string;
  count: number;
  action: "inc" | "dec";
};

export default function Cart() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<{
    id: string;
    action: "inc" | "dec";
  } | null>(null);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/Cart");
      if (!res.ok) throw new Error("failed to fetch cart");
      return res.json();
    },
  });

  // delete
  const { mutate: delMutate } = useMutation({
    mutationFn: deleteItemCart,
    onMutate: (id: string) => setLoadingId(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onSettled: () => setLoadingId(null),
  });

  // update
  const { mutate: updateMutate } = useMutation<unknown, Error, UpdateCartVars>({
    mutationFn: ({ productId, count }) => updateCart(productId, count),
    onMutate: ({ productId, action }) => setUpdatingId({ id: productId, action }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onSettled: () => setUpdatingId(null),
  });

  // clear
  const { mutate: clearMutate, isPending: isClearing } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return (
    <>
      <h2 className="my-2">
        Total Cart Price:{" "}
        <span className="font-bold text-green-500">
          {data?.data?.totalCartPrice} EGP
        </span>
      </h2>

      <h4>
        Num Of Cart Item:{" "}
        <span className="font-bold text-green-500">{data?.numOfCartItems}</span>
      </h4>

      <div className="overflow-hidden rounded-md border p-5 my-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>productName</TableHead>
              <TableHead>ProductImage</TableHead>
              <TableHead>productPrice</TableHead>
              <TableHead>productCount</TableHead>
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.products?.map((prod: any) => (
              <TableRow key={prod._id}>
                <TableCell>{prod.product.title}</TableCell>

                <TableCell>
                  <img src={prod.product.imageCover} className="w-25" alt="" />
                </TableCell>

                <TableCell>{prod.price} EGP</TableCell>

                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Button
                      disabled={updatingId?.id === prod.product._id}
                      onClick={() =>
                        updateMutate({
                          productId: prod.product._id,
                          count: prod.count + 1,
                          action: "inc",
                        })
                      }
                    >
                      {updatingId?.id === prod.product._id &&
                      updatingId?.action === "inc" ? (
                        <span className="w-3 h-3 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                      ) : (
                        "+"
                      )}
                    </Button>

                    <span>{prod.count}</span>

                    <Button
                      disabled={updatingId?.id === prod.product._id}
                      onClick={() => {
                        if (prod.count === 1) {
                          delMutate(prod.product._id);
                        } else {
                          updateMutate({
                            productId: prod.product._id,
                            count: prod.count - 1,
                            action: "dec",
                          });
                        }
                      }}
                    >
                      {updatingId?.id === prod.product._id &&
                      updatingId?.action === "dec" ? (
                        <span className="w-3 h-3 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                      ) : (
                        "-"
                      )}
                    </Button>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <MdDelete
                      className="text-red-500 text-lg cursor-pointer"
                      onClick={() => delMutate(prod?.product?._id)}
                    />
                    {loadingId === prod?.product?._id && (
                      <span className="w-3 h-3 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-3 my-5">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isClearing}
          onClick={() => clearMutate()}
        >
          {isClearing ? (
            <span className="w-3 h-3 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
          ) : (
            "Clear all items"
          )}
        </Button>

        <Link href={`/CheckOut/${data?.cartId}`}><Button>Check out</Button></Link>
      </div>
    </>
  );
}