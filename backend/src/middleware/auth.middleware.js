import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      console.warn("protectRoute: missing jwt cookie")
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.warn("protectRoute: failed to decode jwt")
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.warn("protectRoute: user not found for id", decoded.userId)
      return res.status(401).json({ message: "User Not Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("protectRoute error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Token Failed" });
  }
};
