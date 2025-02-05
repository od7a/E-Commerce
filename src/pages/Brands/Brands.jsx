import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../component/Loading/Loading";
import imagLoading from "../../assets/imgs/Animation - 1734818008614.gif";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [specificBrand, setSpecificBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setBrands(data.data);
  }

  useEffect(() => {
    getBrands();
  }, []);

  async function getSpecificBrand(brandID) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandID}`
      );
      setSpecificBrand(data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="p-4 mb-8 min-h-screen bg-slate-200">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-primary-600">
          <i className="fa-solid fa-tags text-4xl animate-bounce mr-1"></i>
          Top Brands
        </h1>
        {!brands ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-12 gap-5">
            {brands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => getSpecificBrand(brand._id)}
                className="cursor-pointer bg-white text-center rounded-md overflow-hidden shadow-md col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              >
                <img
                  className="w-full h-40 object-contain"
                  src={brand.image}
                  alt={brand.name}
                />
                <h3 className="text-2xl p-3 font-medium text-slate-500">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && specificBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 mx-auto animate-scale-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{specificBrand.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 text-5xl hover:text-red-700"
              >
                &times;
              </button>
            </div>
            <img
              className="w-full h-48 object-contain mb-4"
              src={specificBrand.image}
              alt={specificBrand.name}
            />
            <p className="text-gray-700">{specificBrand.slug}</p>
          </div>
        </div>
      )}
    </>
  );
}
