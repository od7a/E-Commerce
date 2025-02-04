import Loading from "../../component/Loading/Loading";
import Card from "../../component/Card/Card";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import HomeSlider from "../../component/HomeSlider/HomeSlider";
import CategorySlider from "../../component/CategorySlider/CategorySlider";

export default function Home() {
  const [products, setProducts] = useState(null);
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "Get",
    };
    let { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <section className="px-4">
        <HomeSlider />
        <CategorySlider/>
        <form className="w-3/4 mx-auto mb-8">
          <input
            type="search"
            placeholder="Search..."
            className="form-control w-full"
          />
        </form>
        {!products ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            {products.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
