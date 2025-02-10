"use client";

import { useState } from "react";
import {
  FaCopy,
  FaFacebook,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";

const SocialShareButtons = ({ url, title }: { url: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col min-w-[400px]">
      <h1 className="text-left text-2xl font-semibold">
        Share This Product with Your frinds! {"(:"}
      </h1>

      <div className="flex space-x-3 my-10">
        <FacebookShareButton url={url}>
          <FaFacebook className="text-blue-600" size={32} />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <FaXTwitter className="text-black" size={32} />
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={title} separator=" - ">
          <FaWhatsapp className="text-green-500" size={32} />
        </WhatsappShareButton>

        <TelegramShareButton url={url} title={title}>
          <FaTelegram className="text-blue-500" size={32} />
        </TelegramShareButton>
      </div>

      <div className="w-full flex flex-row gap-x-2 items-center">
        <p className="flex-1 bg-gray-200 p-2 rounded text-ellipsis truncate">
          {url}
        </p>
        <button
          onClick={handleCopy}
          className="rounded-2xl flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 hover:bg-gray-300 transition"
        >
          <IoCopyOutline />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
