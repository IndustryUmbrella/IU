import UploadIcon from "@/public/svgs/uploadIcon";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";

const FileInput = ({
  file,
  setFile,
  handleFileChange,
  handleUpload,
  progress,
  multiple,
  iconColor,
  inputTitle,
  style,
}: {
  file: FileList | null;
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload?: any;
  progress: number;
  multiple?: boolean;
  iconColor?: string;
  inputTitle?: string;
  style: string | "styled";
}) => {
  return (
    <>
      {style == "styled" ? (
        <label
          htmlFor="file"
          className="text-white px-10 py-10 cursor-pointer text-center flex flex-col items-center border-2 border-dashed rounded-md"
        >
          <input
            multiple={multiple}
            type="file"
            id="file"
            className="w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm bg-transparent hidden"
            onChange={handleFileChange}
          />
          <UploadIcon color={iconColor || "white"} />
          <p className="text-gray-500">{inputTitle || "Your Brand Logo"}</p>
          <p className="text-gray-500 w-[260px] px-4">
            For best results, photos should be at least 1080px with JPG or PNG
            file.
          </p>
        </label>
      ) : (
        <label
          htmlFor="newImage"
          className="border border-blue-800 w-40 mt-4 bg-gray-200 py-2 rounded cursor-pointer  flex flex-row items-center justify-center gap-x-2"
        >
          <input
            multiple={multiple}
            type="file"
            id="newImage"
            className="w-[260px] md:w-64 text-black h-12 border rounded px-2 text-sm bg-transparent hidden"
            onChange={handleFileChange}
          />
          <FaCamera />
          Add Image
        </label>
      )}

      {file &&
        Array.from(file).map((f, idx) => (
          <div
            className="w-[260px] md:w-80 mt-4 h-auto rounded px-2 text-sm flex justify-between gap-x-2 items-center bg-gray-50"
            key={idx}
          >
            <div className="bg-gray-200 rounded">
              <img
                src={URL.createObjectURL(f)} // Corrected file preview
                alt="File Preview"
                className="w-10 h-10 object-cover"
              />
            </div>

            <div className="flex flex-col  justify-center w-full gap-3">
              <p className="text-gray-500  text-ellipsis truncate w-24">
                {f.name}
              </p>
              <div className="relative h-2 bg-gray-200 rounded-lg">
                <div
                  className="flex mb-2 h-2 bg-teal-500 rounded-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-500 text-sm w-5">
              {`${(f.size / 1024).toFixed(2)} KB`}
            </p>
          </div>
        ))}
    </>
  );
};

export default FileInput;
