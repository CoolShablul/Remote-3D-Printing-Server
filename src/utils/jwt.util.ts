import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "this is my secret";

export const generateToken = (userId: number): string => {
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: '1h'})
};

export const validateToken = (token: string ) => {
    return jwt.verify(token, JWT_SECRET);
}