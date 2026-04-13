
import { CategoryInterface, getCategories } from "@/app/Category.api";

export default async function Categories() {
  const data = await getCategories();
  return (
    <>
      <h2 className="my-8 text-2xl font-semibold">
        Shop By <span className="text-green-500 underline">Category</span>
      </h2>

      {/* Parent flex container */}
      <div className="flex flex-wrap ">
        {data.map((cat) => (
          <div key={cat._id} className="w-1/6 px-2 mb-4 flex flex-col items-center">
            <CatItem cat={cat} />
          </div>
        ))}
      </div>
    </>
  );
}

function CatItem({ cat }: { cat: CategoryInterface }) {
  return (
    <div className="text-center rounded-lg shadow-md border border-border-color p-3 w-full flex flex-col items-center">
      <img
        src={cat.image}
        width={100}
        height={100}
        className="rounded-full object-cover mb-2 w-20 h-20"
        alt={cat.name}
      />
      <p className="text-sm font-medium text-center">{cat.name}</p>
    </div>
  );
}