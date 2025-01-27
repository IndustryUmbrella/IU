"use client";

import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { login } from "@/app/store/sellerSlice";
import { decodeToken } from "@/helper/isAuthorized";

const FetchUserData: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL;

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
          login(userData);
        }
      } catch (error) {
        console.log("Error fetching user data in FetchUserData:", error);
      }
    };

    fetchData();
  }, [login]);

  return null;
};

export default FetchUserData;
