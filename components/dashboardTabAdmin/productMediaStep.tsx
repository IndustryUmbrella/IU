"use client";
import React, { useState } from "react";
import FileInput from "../general/fileInput";

const ProductMediaStep = ({
  images,
  setImages,
  data,
  userData,
}: {
  images: any;
  setImages: any;
  data: any;
  userData: any;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("seller_id", userData._id);
    } catch (error) {
      console.log("Upload failed", error);
    }
  };
  return (
    <div className="mt-5">
      {data ? (
        <div className="flex flex-row flex-wrap gap-x-4">
          {data?.productImage?.map((img: any, idx: number) => (
            <img
              key={idx}
              src={img.link}
              alt="Product Image"
              width={100}
              height={100}
              className="w-20 h-20 rounded object-cover"
            />
          ))}
        </div>
      ) : (
        <FileInput
          file={file}
          setFile={setFile}
          handleUpload={handleUpload}
          handleFileChange={handleFileChange}
          progress={progress}
          multiple={true}
          iconColor="black"
          inputTitle="Your Product Images"
        />
      )}
    </div>
  );
};

export default ProductMediaStep;
