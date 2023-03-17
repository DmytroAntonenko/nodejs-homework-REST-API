const { User } = require("../../models/user");
const createError = require("http-errors");

const { sendEmail } = require("../../middlewares/sendEmail");


const resendEmail = async (req, res) => {
    const { email } = req.body;
      
    const user = await User.findOne({
        email: email,
    });
      
    if (!user) {
         throw createError(404, "User not found");
    }
      
    const { verify, verificationToken } = user;
      
    if (verify) {
        throw createError(400, "Verification has already been passed");
    }
      
    const mail = {
        to: email,
        from: "d.antonenko81@gmail.com",
        subject: "Email verification",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
    };
      
    await sendEmail(mail);
      
    res.status(200).json({
        status: "succes",
        code: 200,
        message: {
        verifyLink: `http://localhost:3000/api/users/verify/${verificationToken}`,
        },
    });
};
      

module.exports = resendEmail;
