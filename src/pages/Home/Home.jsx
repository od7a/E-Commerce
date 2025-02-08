import Loading from "../../component/Loading/Loading";
import Card from "../../component/Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeSlider from "../../component/HomeSlider/HomeSlider";
import CategorySlider from "../../component/CategorySlider/CategorySlider";
import { useFormik } from "formik";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [categories, setCategories] = useState(null); // حالة جديدة للفئات

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
    setFilteredProducts(data.data);
  }

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
  });

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) =>
        product.title
          .toLowerCase()
          .includes(formik.values.searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [formik.values.searchTerm, products]);

  if (!filteredProducts || !categories) {
    return <Loading />;
  }

  return (
    <>
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
