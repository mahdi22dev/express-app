import jwt from "jsonwebtoken";
export const JWTCheck = (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token) {
      return res.redirect("/");
    }
    const user = jwt.verify(
      token,
      process.env.MY_SECRET || "efwfwfwt5t65464yregweffwr45wfwefwef"
    );
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle token expiration
      console.log("Token has expired");
      return res.redirect("/login");
    } else if (error.name === "JsonWebTokenError") {
      // Handle other JWT errors, including invalid signature
      console.log("Invalid token");
      return res.redirect("/");
    } else {
      // Handle other unexpected errors
      console.error(error);
      return res.redirect("/");
    }
  }
};
