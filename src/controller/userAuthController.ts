import type {Request, Response} from "express";
import {registerUser, loginUser} from "../service/user.service";

export const register = async (req: Request, res: Response) => {
    const { username: userName, password, email } = req.body;
    try {
            const user = await registerUser(userName, email, password);
            return res.status(201).json({message: 'User registered successfully', user})
    }
    catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    try {
        const {user, token} = await loginUser(userName, password);
        return res.status(200).json({message: "Login successful", user, token})
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}