
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { CiHeart } from "react-icons/ci";
import { BiRefresh } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
import Link from 'next/link';
import { productIntetface } from '@/Interfaces/Product.interface';
import ButtonCom from '../ButtonCom';
import { WishlistButton } from '../WishlistButton';

interface padeProps {
  prod: productIntetface
}

export default function ProductItem({ prod }: padeProps) {
  return (
    <>
      <div className="border rounded-lg p-3 group hover:shadow-md transition duration-300">

        {/* image + actions */}
        <div className="relative">
          <Link href={`/ProductDetails/${prod._id}`}>
          <Image
            width={100}
            height={100}
            src={prod.imageCover}
            alt={prod.title}
            className="w-full h-[200px] object-contain"
          />
          </Link>

          {/* icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">

            {/* <button className="bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white transition">
              <CiHeart className='text-2xl' />
            </button> */}
             <div className="mb-10">
              <WishlistButton productId={prod._id} />
             </div>

            <button className="bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white transition">
              <BiRefresh className='text-2xl' />
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:bg-green-500 hover:text-white transition">
              <FaRegEye className='text-2xl' />
            </button>
          </div>

          {/* discount */}
          {prod.priceAfterDiscount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{Math.round(
                ((prod.price - prod.priceAfterDiscount) / prod.price) * 100
              )}
              %
            </span>
          )}
        </div>

        {/* content */}
        <div className="mt-3 space-y-1">
          <h6 className="text-gray-500 text-sm">
            {prod.category.name}
          </h6>

          <h3 className="font-medium line-clamp-2">
            {prod.title}
          </h3>

          {/* rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            ⭐⭐⭐⭐⭐
            <span className="text-gray-500">
              {prod.ratingsAverage}
            </span>
          </div>

          {/* price */}
          <div className="flex justify-between items-center mt-2">
            <div>
              {prod.priceAfterDiscount ? (
                <>
                  <span className="text-green-600 font-semibold mr-2">
                    {prod.priceAfterDiscount} EGP
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    {prod.price} EGP
                  </span>
                </>
              ) : (
                <span className="font-semibold">
                  {prod.price} EGP
                </span>
              )}
            </div>

            {/* add button */}
            <ButtonCom id={prod.id} cls='bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition'>+</ButtonCom>
          </div>
        </div>
      </div>
    </>
  )
}
