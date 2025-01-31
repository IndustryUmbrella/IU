"use client";

import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { login, setIsLogged, setProfilePicture } from "@/app/store/sellerSlice";
import { decodeToken } from "@/helper/isAuthorized";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, triggerRefresh } from "@/app/store/productSlice";
import { RootState } from "@/app/store/store";

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const userData = response.data;
          dispatch(login(userData));
          dispatch(setIsLogged(true));

          try {
            const fetchProductResponse = await axios.get(
              `${baseUrl}/api/product/product/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              }
            );

            // Extract only the necessary data from the response
            const productData = fetchProductResponse.data;
            dispatch(setProducts(productData));
          } catch (err: any) {
            console.log(err?.message, "something went wrong");
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [dispatch, baseUrl, refresh]); // Add `refresh` as a dependency

  useEffect(() => {
    if (userData) {
      const fetchProfileImage = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/image/upload/${userData?._id}`,
            { withCredentials: true }
          );

          if (response?.statusText == "OK") {
            dispatch(
              setProfilePicture(`${baseUrl}${response?.data?.profileImage}`)
            );
            // dispatch(triggerRefresh())
          } else {
            console.log("Error fetching image:", response?.data?.message);
          }
        } catch (error) {
          console.log("Error fetching image:", error);
        }
      };
      fetchProfileImage();
    }
  }, [baseUrl, userData]);

  return null;
};

export default FetchUserData;
