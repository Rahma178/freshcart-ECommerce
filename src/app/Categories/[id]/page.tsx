import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
};

type Category = {
  _id: string;
  name: string;
  image: string;
};

async function getCategoryWithProducts(id: string) {
  const [categoryRes, productsRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`),
    fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${id}&limit=50`
    ),
  ]);

  if (!categoryRes.ok) notFound();

  const categoryData = await categoryRes.json();
  const productsData = await productsRes.json();

  return {
    category: categoryData.data as Category,
    products: (productsData.data ?? []) as Product[],
  };
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { category, products } = await getCategoryWithProducts(id);

  return (
    <>
      {/* Hero */}
      <div className="bg-green-500 py-10 px-6 mb-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
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
                Shop {category.name} products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-10">
        {/* Active Filters */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>🔽</span>
            <span>Active Filters:</span>
          </div>
          <div className="flex items-center gap-1 bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
            <span>🏷️</span>
            <span>{category.name}</span>
            <Link href="/categories" className="ml-1 hover:text-purple-900">✕</Link>
          </div>
          <Link href="/categories" className="text-sm text-gray-500 hover:underline">
            Clear all
          </Link>
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {products.length} products
        </p>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-5">
                <span className="text-4xl">📦</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-400 mb-6">
              No products match your current filters.
            </p>
            <Link
              href="/products"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white group"
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
                  {product.category?.name && (
                    <p className="text-xs text-gray-400 mb-1">
                      {product.category.name}
                    </p>
                  )}
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
                    <button className="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-green-600 transition-colors text-lg leading-none">
                      +
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}