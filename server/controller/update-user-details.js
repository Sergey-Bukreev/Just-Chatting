const getUserDetailsFromToken = require('../helpers/get-user-details-from-token');
const UserModel = require('../models/user-model');
async function updateUserDetailsController(req, res) {
    try {

        const token = req.cookies.token || ''
        const user = await getUserDetailsFromToken(token)

        const {name, profile_pic} = req.body
        const updateUserDetails = await UserModel.updateOne({_id : user._id}, {
                name,
                profile_pic
        })

        const userInformation = await UserModel.findById(user._id)

        return res.json({
            message: `User updated successfully`,
            data:userInformation,
            success:true,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true

        })
    }
}
module.exports = updateUserDetailsController