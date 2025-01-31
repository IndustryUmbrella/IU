import UploadIcon from "@/public/svgs/uploadIcon";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // Move useSelector inside the component
  const userData = useSelector((state: RootState) => state.seller.user);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0); // Reset progress when a new file is selected
      setUploadedImageUrl(null); // Reset previous upload
    }
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file || !userData?._id) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("seller_id", userData._id); // Send seller_id with the upload

    try {
      const response = await axios.post(
        "http://localhost:5000/api/image/upload", // Change this to your backend route
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );

      setUploadedImageUrl(response.data.imageUrl); // Assuming backend returns { imageUrl: "uploaded_url" }
    } catch (error) {
      console.log("Upload failed", error);
    }
  };

  return (
    <>
      <label
        htmlFor="file"
        className="text-white px-10 py-10 cursor-pointer text-center flex flex-col items-center border-2 border-dashed rounded-md"
      >
        <input
          type="file"
          id="file"
          className="w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm bg-transparent hidden"
          onChange={handleFileChange}
        />
        <UploadIcon />
        <p className="text-gray-500">Your Brand Logo</p>
        <p className="text-gray-500 w-[260px]">
          For best results, photos should be at least 1080px with JPG or PNG
          file.
        </p>
      </label>

      {file && (
        <div className="w-[260px] md:w-80 mt-4 h-auto rounded px-2 text-sm flex justify-between items-center bg-white">
          <div className="bg-gray-200 rounded">
            <img
              src={URL.createObjectURL(file)}
              alt="File Preview"
              className="w-10 h-10 object-cover"
            />
          </div>

          <div className="flex flex-col gap-1.5 justify-center">
            <p className="text-gray-500">{file.name}</p>
            <div className="relative h-2 bg-gray-200 rounded-lg">
              <div
                className="flex mb-2 h-2 bg-teal-500 rounded-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center justify-center">
            <p className="text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            <div className="text-gray-500">{Math.round(progress)}%</div>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg"
        disabled={!file} // Disable button if no file is selected
      >
        Start Upload
      </button>

      {/* Display uploaded image */}
      {uploadedImageUrl && (
        <div className="mt-4">
          <p className="text-green-500">Upload successful!</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            className="w-20 h-20 rounded-md border mt-2"
          />
        </div>
      )}
    </>
  );
};

export default FileInput;
