import Link from "next/link";
import React from "react";

const AuthOptions = () => {
  return (
    <div className="flex gap-x-4 items-center">
      <Link
        href="/register"
        className="bg-white text-black rounded-md p-2 px-4"
      >
        Register
      </Link>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default AuthOptions;
