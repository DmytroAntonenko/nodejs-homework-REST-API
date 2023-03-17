const { User } = require("../../models/user");
const createError = require("http-errors");
const gravatar = require("gravatar");
const uuid = require("uuid");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `This ${email} is already in use`);
  }
  
  const verificationToken = uuid.v4();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "succes",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verificationToken,
        subscription: "starter",
      },
    },
  });
};

module.exports = signUp;