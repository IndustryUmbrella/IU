import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const SocialMedia = ({ colores }: { colores?: any }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-10 mt-5">
        <a
          className="cursor-pointer"
          href="https://x.com/chatre_Sanaat"
          target="_blank"
        >
          <FaXTwitter size={28} color={colores || "white"} />
        </a>
        <a
          className="cursor-pointer"
          href="https://www.facebook.com/share/12HNzzweUyy/?mibextid=wwXIfr"
          target="_blank"
        >
          <FaFacebook size={28} color={colores || "white"} />
        </a>
        <a
          className="cursor-pointer"
          href="https://www.linkedin.com/in/industry-umbrella-b76747353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
        >
          <FaLinkedin size={28} color={colores || "white"} />
        </a>
        <a
          className="cursor-pointer"
          href="https://www.instagram.com/industry.umbrella?igsh=dHpvbmt4bmdweGZ6&utm_source=qr"
          target="_blank"
        >
          <FaInstagram size={28} color={colores || "white"} />
        </a>
      </div>
    </>
  );
};

export default SocialMedia;
