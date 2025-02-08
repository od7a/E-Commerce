import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishlistInfo, setWishlistInfo] = useState(null);
  const [checkProduct, setCheckProduct] = useState(false);

  async function addProductToWishList({ productId }) {
    const toastLoadingId = toast.loading(
      "Adding product to your WishList... Please wait."
    );
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: { token },
        data: { productId },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.status === "success") {
        toast.success(data.message);
        getWishlistProducts();
        setCheckProduct(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  async function getWishlistProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: { token },
      };
      let { data } = await axios.request(options);
      console.log(data);
      setWishlistInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromWishlist({ productId }) {
    const toastLoadingId = toast.loading(
      "Removing product from your Wishlist... Please wait."
    );
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product removed successfully");
        getWishlistProducts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }
  function checkedProduct({ productId }) {
    if (!wishlistInfo || !wishlistInfo.data) return false;
    const productInfo = wishlistInfo.data.find(
      (productFind) => productFind._id === productId
    );
    return productInfo;
  }

  return (
    <WishListContext.Provider
      value={{ addProductToWishList, getWishlistProducts, wishlistInfo, removeProductFromWishlist,checkedProduct }}
    >
      {children}
    </WishListContext.Provider>
  );
}