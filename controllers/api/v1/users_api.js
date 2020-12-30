const { ExtractJwt } = require('passport-jwt');
const User = require('../../../models/user');


module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.json(500, {
                message: "invalid user/passwoed"
            });
        }

        return res.json(200, {
            message: "signIN. token here..keep it safe",
            data: {
                token: jwt.sign(user.toJSON(), 'mernSocial', { expiresIn: '10000' })
            }
        });

        
    } catch (error) {
        return res.json(500, {
            message: "internal server error"
        });
    }
}
   
}
