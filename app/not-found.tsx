import Button from "@/components/general/button";
import NotFoundMockup from "@/public/mockups/notfoundMockup";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 overflow-x-hidden">
      <NotFoundMockup width={"w-full h-full max-w-[600px] max-h-[600px]"} />
      <Link href="/">
        <Button
          type="primary"
          size="lg"
          text="Back To Home"
          className="w-full"
        />
      </Link>
    </div>
  );
};

export default NotFound;
