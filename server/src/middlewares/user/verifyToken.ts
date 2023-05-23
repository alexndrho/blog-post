import jwt from 'jsonwebtoken';
import IJwtPayLoad from '../../types/IJwtPayLoad';
import { Request, Response, NextFunction } from 'express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers['x-access-token'] as string)?.split(' ')[1];

    if (!token) throw new Error('Failed to authenticate');

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayLoad;

    req.user = decoded;
    next();
  } catch (err) {
    if (!res.headersSent && err instanceof Error) {
      console.log(err);
      res.status(400).json({ isLoggedIn: false, message: err.message });
    } else {
      console.log(err);
      res.status(400).json({ isLoggedIn: false, message: 'An error occured' });
    }
    console.error(err);
  }
};

export { verifyToken };
