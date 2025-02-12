"use client";
import React, { useState } from "react";
import FileInput from "../general/fileInput";
import { FaTrash } from "react-icons/fa6";

interface ProductMediaProps {
  images: FileList | null;
  setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
  data: any;
  userData: any;
  setImagesForRemove: any;
  imagesForRemove: any;
}

const ProductMediaStep: React.FC<ProductMediaProps> = ({
  images,
  setImages,
  data,
  userData,
  setImagesForRemove,
  imagesForRemove,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {};

  const removeExistedImage = (img: any) => {
    setImagesForRemove((prev: String[]) => [...prev, img.imageId]);
  };

  return (
    <div className="mt-5">
      {data?.productImage?.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-x-4">
          {data?.productImage
            ?.filter((img: any) => !imagesForRemove.includes(img.imageId)) // Dynamically remove without state mutation
            .map((img: any, idx: number) => (
              <div key={idx} className="relative">
                <img
                  src={img.link}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded object-cover"
                />
                {imagesForRemove.length < data?.productImage?.length - 1 && (
                  <FaTrash
                    color="red"
                    className="absolute top-2 left-2 cursor-pointer"
                    onClick={() => removeExistedImage(img)}
                  />
                )}
              </div>
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
