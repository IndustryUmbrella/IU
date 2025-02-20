"use client";
import { useState } from "react";
import PopUp from "./popUp";
import Overlay from "./overlay";
import { Share2 } from "lucide-react";
import SocialShareButtons from "./socialShareButtons";
import { usePathname, useRouter } from "next/navigation";

const ShareButton = ({ details }: { details: any }) => {
  const [error, setError] = useState<string | null>(null);
  const [isShowPopUp, setIsShowPop] = useState<boolean | null>(false);

  const route = usePathname();
  const handleShare = async () => {
    try {
      setIsShowPop(true);
      setError(null);
    } catch (err) {
      setError("Sharing failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {isShowPopUp && (
        <Overlay isOpen={isShowPopUp} onClose={() => setIsShowPop(false)}>
          <SocialShareButtons
            url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${route}`}
            title={details?.productDescription}
          />
        </Overlay>
      )}
      <Share2
        size={20}
        onClick={handleShare}
        color="white"
        className="cursor-pointer"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ShareButton;
