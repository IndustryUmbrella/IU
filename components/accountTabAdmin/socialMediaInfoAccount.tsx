import React from "react";
import NoUserInfoSkeleton from "./noUserInfoSkeleton";

const SocialMediaInfoAccount = ({
  formik,
  userData,
}: {
  formik: any;
  userData: any;
}) => {
  return (
    <>
      <div className="flex flex-col  gap-y-2">
        <h1 className="text-3xl my-5 text-center md:text-left">Social Media</h1>
        {userData == undefined ? (
          <NoUserInfoSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {[
              "facebook",
              "instagram",
              "twitter",
              "linkedin",
              "pinterest",
              "website",
            ].map((platform: any, index: number) => (
              <div
                className="relative flex flex-col items-center  w-full text-black  rounded px-2 text-sm"
                key={platform}
              >
                <input
                  type="text"
                  id={platform}
                  name={platform}
                  placeholder={`Enter your ${
                    platform.charAt(0).toUpperCase() + platform.slice(1)
                  } URL`}
                  className={`w-full max-w-[260px] text-black h-12 border rounded px-2 text-sm ${
                    formik.touched[platform as keyof typeof formik.touched] &&
                    formik.errors[platform as keyof typeof formik.errors]
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#090909]`}
                  value={formik.values[platform as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[platform as keyof typeof formik.touched] &&
                  formik.errors[platform as keyof typeof formik.errors] && (
                    <span className="text-red-500 text-[12px]">
                      {formik.errors[platform as keyof typeof formik.errors]}
                    </span>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SocialMediaInfoAccount;
