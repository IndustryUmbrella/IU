"use client";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { login, setIsLogged } from "@/app/store/sellerSlice";
import { decodeToken } from "@/helper/isAuthorized";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/app/store/productSlice";
import { RootState } from "@/app/store/store";
import { setOrders } from "@/app/store/orderSlice";

const FetchUserData: React.FC = () => {
  const dispatch = useDispatch();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const userData = useSelector((state: RootState) => state.seller.user);
  const refresh = useSelector((state: any) => state.product.refresh);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken");

        if (!token) {
          console.log("No authToken cookie found");
          return;
        }

        const id: any = decodeToken(token);

        const response = await axios.get(`${baseUrl}/api/auth/seller/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.status === 200) {
          const userData = response.data;
          dispatch(login(userData));
          dispatch(setIsLogged(true));

          const fetchProductResponse = await axios.get(
            `${baseUrl}/api/product/product/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          try {
            const response = await axios.get(
              `${baseUrl}/api/order/get-order/${userData?._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }
            );

            dispatch(setOrders(response?.data?.orders));
          } catch (error) {
            console.error("Error fetching orders:", error);
          }

          const productData = fetchProductResponse.data;
          dispatch(setProducts(productData));
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [dispatch, userData?._id, baseUrl, refresh]);

  return null;
};

export default FetchUserData;
