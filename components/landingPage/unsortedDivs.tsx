"use client";
import React, { useEffect, useState } from "react";
import Image1 from "../../public/images/image1.jpg";
import Image2 from "../../public/images/image2.jpg";
import Image3 from "../../public/images/image3.jpg";
import Image4 from "../../public/images/image4.jpg";
import Image5 from "../../public/images/image5.jpg";
import Image6 from "../../public/images/image6.jpg";
import Image7 from "../../public/images/image7.jpg";
import Image8 from "../../public/images/image8.jpg";
import Image9 from "../../public/images/image9.jpg";
import Image10 from "../../public/images/image10.jpg";

const UnsortedDivs = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Image1.src;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <>
      <div className="w-full h-full max-w-[1000px] max-h-[510px] mt-10 relative hidden lg:block bg-red-500">
        <div
          className="mockup border z-[1000] shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            position: "absolute",
            top: "0px",
            right: "180px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image10.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            position: "absolute",
            top: "40px",
            right: "0px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image9.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            position: "absolute",
            top: "120px",
            right: "0px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image8.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            position: "absolute",
            top: "100px",
            right: "270px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image7.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            position: "absolute",
            top: "200px",
            right: "90px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image6.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
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
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            top: "300px",
            right: "120px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image4.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            top: "100px",
            right: "120px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image3.src})`,
              backgroundSize: "cover",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            top: "200px",
            right: "10px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image2.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        ></div>
        <div
          className="mockup shadow-[0px_5px_30px_rgba(255,255,255,0.4)] "
          style={{
            top: "250px",
            right: "220px",
            ...(isImageLoaded && {
              backgroundImage: `url(${Image1.src})`,
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
