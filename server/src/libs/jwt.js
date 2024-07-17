require('dotenv').config();
const jwt = require('jsonwebtoken')

function createAccessToken(payload) {
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn:"5h"
            },
            (err, token) => {
                if(err) {
                    reject(err)
                }
                resolve(token)
            }
        )
    })
}

module.exports = {
    createAccessToken
};