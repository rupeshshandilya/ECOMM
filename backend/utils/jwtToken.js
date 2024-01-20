//creating token and saving that in cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();


    //options for cookies
    const options = {
        express: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success: true,
        user,
        token,
    })
}

module.exports = sendToken;