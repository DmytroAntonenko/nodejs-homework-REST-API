const { User } = require("../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
 

  try {
    if (bearer !== "Bearer" || !token) {
      throw createError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    
    const user = await User.findOne({ _id: id });
    if (!user || !user.token) {
      throw createError(401, "Not authorized");
    }

    req.user = user;
    
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
