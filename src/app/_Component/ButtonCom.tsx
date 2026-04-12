'use client'

import React, { ReactNode } from 'react'
import { addToCart } from './ProductItem/actions/addCart.actions'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface pageProps {
  children: ReactNode,
  cls: string,
  id: string
}

export default function ButtonCom({ children, cls, id }: pageProps) {

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addToCart,

    onSuccess: (data) => {
      toast(data.message, { position: "top-right" });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error: any) => {
      toast(error.message || "Something went wrong");
    },
  });

  function handleAddCart() {
    mutate(id); 
  }

  return (
    <button onClick={handleAddCart} className={cls}>
      {children}
    </button>
  );
}