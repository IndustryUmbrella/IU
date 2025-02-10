import UploadIcon from "@/public/svgs/uploadIcon";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const FileInput = ({
  file,
  setFile,
  handleFileChange,
  handleUpload,
  progress,
  multiple,
  iconColor,
  inputTitle,
}: {
  file: any;
  setFile: any;
  handleFileChange: any;
  handleUpload: any;
  progress: number;
  multiple?: boolean | false;
  iconColor?: string | "white";
  inputTitle?: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <>
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
        <UploadIcon color={iconColor} />
        {inputTitle ? (
          <p className="text-gray-500">{inputTitle}</p>
        ) : (
          <p className="text-gray-500">Your Brand Logo</p>
        )}
        <p className="text-gray-500 w-[260px] px-4">
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

      {/* <button
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg"
        disabled={!file}
      >
        Start Upload
      </button> */}
    </>
  );
};

export default FileInput;
