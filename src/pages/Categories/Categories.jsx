import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../component/Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
  }

  // Fetch subcategories
  async function getSubcategories(categoryId) {
    setLoading(true);
    const subCat = toast.loading("Waiting");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setSubcategories(data.data);
      toast.success('Success');
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
      toast.dismiss(subCat);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="px-2 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-primary-600">
          <i className="fa-solid fa-layer-group text-4xl animate-bounce mr-1"></i>
          Explore Categories
        </h1>
        {!categories ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            {categories.map((category) => (
              <div
                key={category._id}
                className="cursor-pointer category text-center rounded-md overflow-hidden shadow-md col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                onClick={() => {
                  getSubcategories(category._id);
                  setSelectedCategory(category.name);
                }}
              >
                <div className="h-64">
                  <img
                    className="w-full h-64 object-contain"
                    src={category.image}
                    alt={category.name}
                  />
                </div>
                <h3 className="text-2xl p-3 font-medium text-primary-500">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Display subcategories */}
      {loading ? (
        <Loading />
      ) : (
        subcategories && (
          <section className="bg-slate-200 rounded-md p-5 mt-8">
            <h2 className="font-bold text-3xl text-primary-500 text-center">
              {selectedCategory}
            </h2>
            <div className="text-nowrap grid grid-cols-12 gap-5 py-5">
              {subcategories.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white text-center p-6 rounded-lg shadow-md text-sm md:text-lg font-bold capitalize col-span-12 md:col-span-6 lg:col-span-4"
                >
                  {sub.name}
                </div>
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
}
