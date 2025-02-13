"use client";
import React, { useState } from "react";
import FileInput from "../general/fileInput";
import { FaCamera, FaTrash } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  const [file, setFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: any) => {
    setImages((prevImages: any) => ({
      ...prevImages,
      ...e.target.files,
    }));
    setFile(e.target.files);
  };
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const token = Cookies.get("authToken");

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {};

  const removeExistedImage = async (img: any) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${baseUrl}/api/product/delete-productImage/${img?.imageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImagesForRemove((prev: String[]) => [...prev, img.imageId]);
      setIsLoading(false);
    } catch (e) {
      alert("error while deleting image");
      setIsLoading(false);
    }
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  return (
    <div className="mt-5">
      {data?.productImage?.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-x-4">
          {data?.productImage
            ?.filter((img: any) => !imagesForRemove.includes(img.imageId))
            .map((img: any, idx: number) => (
              <div key={idx} className="relative">
                <img
                  src={img.link}
                  alt="Product Image"
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded object-cover"
                />
                {imagesForRemove.length < data?.productImage?.length - 1 &&
                  (isLoading ? (
                    <FontAwesomeIcon
                      color="red"
                      icon={faSpinner}
                      spin
                      className="absolute top-2 left-2 cursor-pointer"
                    />
                  ) : (
                    <FaTrash
                      color="red"
                      className="absolute top-2 left-2 cursor-pointer"
                      onClick={() => removeExistedImage(img)}
                    />
                  ))}
              </div>
            ))}
        </div>
      ) : (
        <FileInput
          style="styled"
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

      {data?.productImage && (
        <>
          <FileInput
            style="simple"
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
            handleFileChange={handleFileChange}
            progress={progress}
            multiple={true}
            iconColor="black"
            inputTitle="Your Product Images"
          />
        </>
      )}
    </div>
  );
};

export default ProductMediaStep;
