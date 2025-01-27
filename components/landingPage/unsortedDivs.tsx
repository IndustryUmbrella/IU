"use client";
import React, { useEffect, useState } from "react";
import Image1 from "../../public/images/image1.png";
import Image2 from "../../public/images/image2.png";
import Image3 from "../../public/images/image3.png";
import Image4 from "../../public/images/image4.png";
import Image5 from "../../public/images/image5.png";
import Image6 from "../../public/images/image6.png";
import Image7 from "../../public/images/image7.png";

const UnsortedDivs = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Image1.src;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <>
      <div className="w-full h-full max-w-[1000px] max-h-[510px] relative hidden lg:block">
        <div
          className="mockup border z-[1000]"
          style={{
            position: "absolute",
            top: "0px",
            right: "180px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            position: "absolute",
            top: "40px",
            right: "0px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image2.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            position: "absolute",
            top: "120px",
            right: "0px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image3.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            position: "absolute",
            top: "100px",
            right: "270px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            position: "absolute",
            top: "200px",
            right: "90px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image4.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            top: "100px",
            right: "120px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image5.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            top: "300px",
            right: "120px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image6.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            top: "100px",
            right: "120px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image7.src})`,
              backgroundSize: "cover",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            top: "200px",
            right: "10px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup"
          style={{
            top: "250px",
            right: "220px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image4.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
      </div>
    </>
  );
};

export default UnsortedDivs;
