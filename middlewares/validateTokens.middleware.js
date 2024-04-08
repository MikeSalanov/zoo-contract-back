const jwt = require('jsonwebtoken');
const { releaseTokens } = require('../utils/releaseTokens');
const { Admin } = require('../classes/Admin');

const validateTokens = (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (errAccessToken, userAccessToken) => {
        if (!errAccessToken) {
            req.user = userAccessToken;
            return next();
        }
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            async (errRefreshToken, userRefreshToken) => {
                if (errRefreshToken) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                console.log(userRefreshToken);
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = releaseTokens({
                    login: userRefreshToken.login,
                });

                const admin = new Admin(userRefreshToken.login);
                await admin.toMakeInvalidRefreshToken(refreshToken);
                await admin.addRefreshTokenToUser(newRefreshToken);

                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: false,
                });
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                });

                req.user = {
                    login: admin.getLogin,
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                };
                return next();
            },
        );
    });
};

module.exports = validateTokens;
