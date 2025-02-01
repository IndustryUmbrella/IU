import { RootState } from "@/app/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileImage = ({ sellerId }: { sellerId: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const userData: any = useSelector(
    (state: RootState) => state.seller.profilePicture
  );

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/upload/${sellerId}`
        );

        if (response.status == 200) {
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${response?.data.profileImage}`;
        } else {
          console.log("Error fetching image:", response?.data.profileImage);
        }
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };

    fetchProfileImage();
  }, [sellerId]);

  return (
    <div>
      {imageUrl ? (
        <img
          src={userData}
          className="border"
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      ) : (
        <p>Profile image not available</p>
      )}
    </div>
  );
};

export default ProfileImage;
