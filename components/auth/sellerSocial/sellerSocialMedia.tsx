import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaGlobe,
} from "react-icons/fa";

const SellerSocialMedia = ({ socialLinks }: { socialLinks: any }) => {
  const iconMap: any = {
    Facebook: <FaFacebook size={28} color={"white"} />,
    Instagram: <FaInstagram size={28} color={"white"} />,
    Twitter: <FaTwitter size={28} color={"white"} />,
    LinkedIn: <FaLinkedin size={28} color={"white"} />,
    Pinterest: <FaPinterest size={28} color={"white"} />,
    Website: <FaGlobe size={28} color={"white"} />,
  };
  if (socialLinks?.companySocialMedia.length === 0) return;

  return (
    <div className="">
      <div>
        <h1 className="text-white text-2xl mb-5">
          Follow {socialLinks?.companyName} on Social Media
        </h1>
        <div className="flex flex-row gap-x-5">
          {socialLinks?.companySocialMedia.map((social: any, idx: any) => {
            return (
              <div key={idx} className="">
                <a href={social?.link} target="_blank">
                  {iconMap[social?.title] || (
                    <FaGlobe size={28} color="white" />
                  )}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerSocialMedia;
