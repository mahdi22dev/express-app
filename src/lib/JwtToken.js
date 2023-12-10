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
      console.log("Token has expired");
      return res.redirect("/sign-in");
    } else if (error.name === "JsonWebTokenError") {
      console.log("Invalid token");
      return res.redirect("/sign-in");
    } else {
      console.error(error);
      return res.redirect("/sign-in");
    }
  }
};
