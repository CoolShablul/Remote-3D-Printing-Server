import { Router } from "express";
import { register, login} from "../controller/userAuth.controller";
import {authenticate} from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticate, (req, res, next) => {
    res.status(200).json({ message: 'Protected route accessed', user: (req as any).user });
});

export default router;