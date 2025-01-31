import { useEffect, useState } from "react";

const ProfileImage = ({ sellerId }: { sellerId: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/image/upload/${sellerId}`
        );
        const data = await response.json();

        if (response.ok) {
          setImageUrl(`http://localhost:5000${data.profileImage}`);
        } else {
          console.log("Error fetching image:", data.message);
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
          src={imageUrl}
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
