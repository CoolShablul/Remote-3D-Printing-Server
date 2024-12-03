import bcrypt from 'bcryptjs';
import { createUser, getUserByUserName } from './user.store';
import { generateToken } from '../utils/jwt.util';

export const registerUser = async (userName: string, email: string, password: string) => {
    // check if userName already exists
    if( getUserByUserName(userName)) {
        throw new Error('UserName already exists!')
    }

    // hash the password and add the user info to memory
    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser( email, userName, hashedPassword);
}

export const loginUser = async (userName: string, password: string) => {
    // find user
    const user = getUserByUserName(userName);
    if(!user) throw new Error('user not found!');

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('Invalid credentials');

    // generate jwt
    const token = generateToken(user.id);

    return {user, token};
}