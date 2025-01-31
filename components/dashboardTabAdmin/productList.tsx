import { RootState } from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../general/table";
import ProfileImage from "../general/imageUpload";
// import ProfileImage from "../general/imageUpload";
// import ImageUpload from "../general/imageUpload";
// import ProfileImage from "../general/imageUpload";

const ProductList = () => {
  const userData = useSelector((state: RootState) => state.seller.user);
  const products: any = useSelector(
    (state: RootState) => state.product.products
  );
  const [profile, setProfile] = useState<any>("");

  // Example: Fetch and display the uploaded image in your frontend

  // useEffect(() => {
  //   const fetchImage = async (imageId) => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/api/image/${imageId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Image not found");
  //       }

  //       const imageData = await response.json();
  //       const imageBase64 = imageData.imageBuffer; // Base64 image data
  //       console.log(imageBase64, "iiiii");

  //       // Create an image element and set the source as base64 data
  //       const imgElement = document.createElement("img");
  //       imgElement.src = `data:${imageData.contentType};base64,${imageBase64}`;
  //       document.body.appendChild(imgElement); // Append the image to the body or to a specific container
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //     }
  //   };
  //   // const imageId = response.imageId; // The imageId you get after successful upload
  //   fetchImage("679ce046df44be74b8c10adc");
  // }, []);

  return (
    <>
      <div className="bg-white rounded-md p-4">
        {/* <img src={} */}
        {/* <ProfileImage sellerId="6796734ed3c3ae92c53c4867" /> */}
        <div>
          <Table
            columns={["Product Info", "product Price", "active", "action"]}
            data={products?.data}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
