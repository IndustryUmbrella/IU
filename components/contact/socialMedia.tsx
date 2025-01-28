import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const SocialMeida = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-x-10 mt-5">
        <a
          className="cursor-pointer"
          href="https://masihullah.vercel.app"
          target="_blank"
        >
          <FaXTwitter size={28} color="white" />
        </a>
        <a
          className="cursor-pointer"
          href="https://masihullah.vercel.app"
          target="_blank"
        >
          <FaFacebook size={28} color="white" />
        </a>
        <a
          className="cursor-pointer"
          href="https://masihullah.vercel.app"
          target="_blank"
        >
          <FaLinkedin size={28} color="white" />
        </a>
        <a
          className="cursor-pointer"
          href="https://masihullah.vercel.app"
          target="_blank"
        >
          <FaInstagram size={28} color="white" />
        </a>
      </div>
    </>
  );
};

export default SocialMeida;
