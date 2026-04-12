// import MySlider from "@/app/-components/Slider/Slider";
import { getSingleProd } from "@/apis/SingleProduct.api";
import ButtonCom from "@/app/_Component/ButtonCom";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const data = await getSingleProd(id);

  return (
    <div className="flex items-center ">
      <div className="md:w-1/3  p-4">
        <Image
          src={data.imageCover}
          width={200}
          height={200}
          className="w-2/3"
          alt=""
        />

        <div className="flex gap-3">
          {data.images.map((img: string) => (
            <Image
              src={img}
              alt="pic"
              key={img}
              width={50}
              height={50}
              className="cursor-pointer"
            />
          ))}
          {/* <MySlider pageList={data.images} slidesPerView={2}/> */}
        </div>
      </div>

      <div className="md:w-1/3  p-4">
        {/* content */}
        <div className="mt-3 space-y-1">
          <h6 className="text-gray-500 text-sm">{data.category.name}</h6>

          <h3 className="font-medium line-clamp-2">{data.title}</h3>
          <p>{data.description}</p>

          {/* rating */}
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            ⭐⭐⭐⭐⭐
            <span className="text-gray-500">{data.ratingsAverage}</span>
          </div>

          {/* price */}
          <div className=" items-center mt-2">
            <div>
              {data.priceAfterDiscount ? (
                <>
                  <span className="text-green-600 font-semibold mr-2">
                    {data.priceAfterDiscount} EGP
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    {data.price} EGP
                  </span>
                </>
              ) : (
                <span className="font-semibold">{data.price} EGP</span>
              )}
            </div>

            {/* add button */}
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <ButtonCom id={id} cls="w-full bg-green-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-green-600 transition">
                  Add To Cart
                </ButtonCom>
              </div>

              <button className="bg-gray-950 text-white p-2 flex-1 rounded-full flex items-center justify-center hover:bg-gray-600 transition">
                Buy It Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
