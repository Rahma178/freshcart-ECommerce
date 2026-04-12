import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Subcategory = {
  _id: string;
  name: string;
};

type Category = {
  _id: string;
  name: string;
  image: string;
};

async function getCategoryWithSubs(id: string) {
  const [categoryRes, subsRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`),
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`),
  ]);

  if (!categoryRes.ok) notFound();

  const categoryData = await categoryRes.json();
  const subsData = await subsRes.json();

  return {
    category: categoryData.data as Category,
    subcategories: (subsData.data ?? []) as Subcategory[],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { category, subcategories } = await getCategoryWithSubs(id);

  return (
    <>
      {/* Hero */}
      <div className="bg-green-500 py-10 px-6 mb-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white">Categories</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </div>

          {/* Category Info */}
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-2 w-16 h-16 relative flex-shrink-0 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-white text-3xl font-bold">{category.name}</h1>
              <p className="text-white/80 text-sm mt-1">
                {subcategories.length} Subcategories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="container mx-auto px-4 pb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Browse Subcategories
        </h2>

        {subcategories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No subcategories found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subcategories.map((sub) => (
              <Link
                href={`/shop/${id}/${sub._id}`}
                key={sub._id}
                className="border rounded-xl p-6 flex items-center justify-center text-center hover:shadow-md hover:border-green-400 transition-all bg-white cursor-pointer group"
              >
                <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  {sub.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}