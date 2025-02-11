import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import axios from "axios";
import Loading from "../../component/Loading/Loading";
import { useParams } from "react-router-dom";
import { WishListContext } from "../../context/WishList.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "swiper/css";
import Card from "../../component/Card/Card";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(false); 
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList, checkedProduct } = useContext(WishListContext);
  const { id } = useParams();

  async function getProductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setRelatedProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (!productDetails) return;
    getRelatedProducts();
  }, [productDetails]);

  if (!productDetails || !relatedProducts) {
    return <Loading />;
  }

  const handleAddToCart = async () => {
    setLoading(true); 

    try {
      await addProductToCart({ productId: id });
    } catch (error) {
      console.error(error);
    }

    setLoading(false); 
  };

  return (
    <>
      <Helmet>
        <title>FreshCart - {productDetails.title}</title>
        <meta
          name="description"
          content={`Explore ${
            productDetails.title
          } on FreshCart. ${productDetails.description.substring(0, 150)}...`}
        />
      </Helmet>
      <section className="bg-slate-100 p-4 rounded-xl mb-10 grid grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-12 md:col-span-4 rounded-md shadow-lg overflow-hidden flex items-center">
          <ReactImageGallery
            items={productDetails.images.map((image) => {
              return {
                original: image,
                thumbnail: image,
              };
            })}
            showNav={false}
            autoPlay={true}
            thumbnailPosition={"left"}
          />
        </div>
        <div className="col-span-12 md:col-span-8 space-y-5 flex justify-center flex-col mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="size-12 bg-white rounded-full overflow-hidden">
              <img
                src={productDetails.brand.image}
                alt={productDetails.brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="font-medium text-lg">{productDetails.brand.name}</h4>
          </div>
          <div className="space-y-2">
            <h2 className="font-extrabold text-2xl">{productDetails.title}</h2>
            <h3 className="font-extrabold">{productDetails.category.name}</h3>
            <p className="text-sm text-slate-900">
              {productDetails.description}
            </p>
            <div className="text-xl flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-300"></i>
              <span>{productDetails.ratingsAverage}</span>
            </div>

            <div>
              {productDetails.priceAfterDiscount ? (
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-500">
                    ${productDetails.price}
                  </span>
                  <span className="text-primary-500 text-xl font-bold">
                    ${productDetails.priceAfterDiscount}
                  </span>
                </div>
              ) : (
                <span className="text-primary-500 text-xl font-bold">
                  ${productDetails.price}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white grow rounded-md px-6 py-2 flex justify-center items-center"
              onClick={handleAddToCart}
              disabled={loading} 
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Add Cart"
              )}
            </button>
            <div
              className={`rounded-full p-5 size-8 flex items-center justify-center cursor-pointer ${
                checkedProduct({ productId: id })
                  ? "text-white bg-primary-500"
                  : "bg-white text-primary-500"
              }`}
              onClick={() => {
                addProductToWishList({ productId: id });
              }}
            >
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl text-gray-600 my-8">Related Products</h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={15}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
        >
          {relatedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <Card productInfo={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
