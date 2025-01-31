import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  try {
    const decoded: any = jwt.decode(token);

    return decoded ? decoded?.sellerId : null;
  } catch (error) {
    console.log("Failed to decode token", error);
    return null;
  }
};
