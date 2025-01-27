"use client";

import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { login, setIsLogged } from "@/app/store/sellerSlice";
import { decodeToken } from "@/helper/isAuthorized";
import { useDispatch } from "react-redux";

const FetchUserData: React.FC = () => {
  const dispatch = useDispatch();
  // const baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [login]);

  return null;
};

export default FetchUserData;
