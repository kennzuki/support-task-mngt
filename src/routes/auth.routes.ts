import {Router} from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const authRouter = Router();

authRouter.get('/register', async (req, res,next) => {
    try {
        const{ email, password } = req.body;
        await registerUser(email, password);
        res.status(201).json({success: true, message: 'Registration successful. Please login to continue.' });
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken } = await loginUser(email, password);

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
});