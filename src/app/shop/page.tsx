import Image from "next/image";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  image: string;
};

async function getCategories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("failed to fetch categories");
  const { data } = await res.json();
  return data as Category[];
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      {/* Hero */}
      <div className="bg-green-500 py-10 px-6 mb-8">
        <div className="container mx-auto flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <span className="text-white text-2xl">📂</span>
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">All Categories</h1>
            <p className="text-white/80 text-sm mt-1">
              Browse our wide range of product categories
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              href={`/shop/${category._id}`}
              key={category._id}
              className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white group cursor-pointer"
            >
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                  <p className="text-white font-semibold text-sm">
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}