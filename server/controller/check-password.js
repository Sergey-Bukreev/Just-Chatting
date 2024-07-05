const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function checkPasswordController(req, res) {
    try {
        const { password, userId } = req.body;

        const user = await  UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true
            });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                message: `Please check password or email address`,
                error:true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email,

        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {expiresIn: "1d"});
        const cookieOptions = {
            http:true,
            secure:true,
        }
        return res.cookie('token', token, cookieOptions).status(200).json({
            message:'Login successful',
            token:token,
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error:true
        })
    }
}

module.exports = checkPasswordController;