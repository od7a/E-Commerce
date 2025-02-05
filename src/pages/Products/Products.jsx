import { useEffect, useState } from "react";
import { useFormik } from "formik";
import DropdownFilter from "../../component/DropdownFilter/DropdownFilter";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  async function getProducts(sortOption = "") {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products${sortOption}`,
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
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(formik.values.search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [formik.values.search, products]);

  const handleFilter = (sortOption) => {
    getProducts(sortOption);
  };

  return (
    <>
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
