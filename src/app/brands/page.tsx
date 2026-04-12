import Image from "next/image";
import Link from "next/link";

type Brand = {
  _id: string;
  name: string;
  image: string;
};

async function getBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("failed to fetch brands");
  const { data } = await res.json();
  return data as Brand[];
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-400 py-10 px-6 mb-8">
        <div className="container mx-auto flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <span className="text-white text-2xl">🏷️</span>
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Top Brands</h1>
            <p className="text-white/80 text-sm mt-1">
              Shop from your favorite brands
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand._id}`}
              key={brand._id}
              className="border rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow bg-white cursor-pointer"
            >
              <div className="w-full h-28 relative">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{brand.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}