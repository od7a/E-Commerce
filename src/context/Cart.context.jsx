import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function addProductToCart({ productId }) {
    const toastLoadingId = toast.loading(
      "Adding product to your cart... Please wait."
    );
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart({ productId }) {
    const toastLoadingId = toast.loading(
      "Removing product from your cart... Please wait."
    );
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product removed successfully");
        setCartInfo(data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  async function clearAllCart() {
    const clearAll = toast.loading("Clearing your cart... Please wait.");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      // console.log(data);
      if (data.message === "success") {
        setCartInfo({
          numOfCartItems: 0,
        });
        toast.success("Your cart has been successfully cleared!");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to clear the cart. Please try again."
      );
    } finally {
      toast.dismiss(clearAll);
    }
  }

  async function updateProductCart({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        removeProductFromCart,
        clearAllCart,
        updateProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
