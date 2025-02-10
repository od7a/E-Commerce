import { useEffect, useState } from "react";
import { useFormik } from "formik";
import DropdownFilter from "../../component/DropdownFilter/DropdownFilter";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortOption, setSortOption] = useState("");

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
    setFilteredProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (products) {
      let filtered = [...products];

      // Apply search filter
      if (formik.values.search) {
        filtered = filtered.filter((product) =>
          product.title
            .toLowerCase()
            .includes(formik.values.search.toLowerCase())
        );
      }

      // Apply sorting
      if (sortOption === "price") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === "-price") {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
    }
  }, [formik.values.search, products, sortOption]);

  const handleFilter = (selectedSortOption) => {
    setSortOption(selectedSortOption);
  };

  return (
    <>
      <Helmet>
        <title>Products - Explore Our Collection</title>
        <meta
          name="description"
          content="Browse and search for the best products available in our store."
        />
      </Helmet>
      <section className="px-2">
        <div className="grid grid-cols-12 gap-5 mb-8">
          <div className="search col-span-12 sm:col-span-8 lg:col-span-10">
            <form onSubmit={formik.handleSubmit}>
              <input
                type="search"
                placeholder="Search ..."
                className="form-control w-full"
                name="search"
                value={formik.values.search}
                onChange={formik.handleChange}
              />
            </form>
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 ">
            <DropdownFilter onFilter={handleFilter} />
          </div>
        </div>

        {!filteredProducts ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            {filteredProducts.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
