import { RootState } from "@/app/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileImage = ({ sellerId }: { sellerId: string }) => {
  const userData: any = useSelector(
    (state: RootState) => state.seller.profilePicture
  );

  return (
    <div>
      {userData?.companyLogo ? (
        <img
          src={userData?.companyLogo}
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
