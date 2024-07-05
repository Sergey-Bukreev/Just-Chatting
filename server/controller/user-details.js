const getUserDetailsFromToken = require('./../helpers/get-user-details-from-token')
async function userDetailsController(req, res) {
    try {

        const token = req.cookies.token || ''
        const user = await getUserDetailsFromToken(token)
        return res.json({
            message:'',
            data:user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message | error,
            error:true

        })
    }
}
module.exports = userDetailsController