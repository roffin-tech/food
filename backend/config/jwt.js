// Importing module
import jwt from 'jsonwebtoken';

export function createToken(userData) {
    console.log('userData', userData)
    return jwt.sign(
        {userId: userData.user_id,userName: userData.user_name, role: (userData|| {}).role},
        process.env.JWT_TOKEN_SECRET || 'hdffhdfhdfhdfjhdfhdfhjdhfdhjf',
        {expiresIn: "1m"}
    )
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_TOKEN_SECRET||'hdffhdfhdfhdfjhdfhdfhjdhfdhjf', function(err, decoded) {
        if (err) {
            return {
                valid: false
            };
        }
        else {
            return {
                userId: decoded.userId,
                valid: true
            };
        }
    });
}