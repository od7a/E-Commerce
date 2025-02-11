import Loading from "../../component/Loading/Loading";
import Card from "../../component/Card/Card";
import { useMemo } from "react";
import axios from "axios";
import HomeSlider from "../../component/HomeSlider/HomeSlider";
import CategorySlider from "../../component/CategorySlider/CategorySlider";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
  });

  async function getProducts() {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return data.data;
  }

  async function getCategories() {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return data.data;
  }

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Add filtered products calculation
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.title.toLowerCase().includes(formik.values.searchTerm.toLowerCase())
    );
  }, [products, formik.values.searchTerm]);

  if (productsLoading || categoriesLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>FreshCart - Home</title>
        <meta
          name="description"
          content="Discover fresh products and amazing deals on FreshCart. Shop now for the best groceries and household items!"
        />
      </Helmet>
      <section className="px-4">
        <HomeSlider />
        <CategorySlider categories={categories} />
        <form className="w-3/4 mx-auto mb-8">
          <input
            type="search"
            name="searchTerm"
            placeholder="Search..."
            className="form-control w-full"
            value={formik.values.searchTerm}
            onChange={formik.handleChange}
          />
        </form>
        <div className="grid grid-cols-12 gap-5">
          {filteredProducts.map((product) => (
            <Card key={product.id} productInfo={product} />
          ))}
        </div>
      </section>
    </>
  );
}