import User from '../../models/user';
import IUser from '../../types/model/user';
import IJwtPayLoad from '../../types/IJwtPayLoad';

import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newToken = jwt.sign(
      { id: req.user?.id } as IJwtPayLoad,
      process.env.JWT_SECRET!,
      { expiresIn: 86400 }
    );

    res.json({
      isloggedIn: true,
      token: 'Bearer ' + newToken,
    });
  } catch (err) {
    if (!res.headersSent)
      res.json({ isLoggedIn: true, message: 'Failed to authenticate' });
    console.error(err);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    if (await User.findOne({ username: user.username })) {
      res.status(409).json({
        success: false,
        message: 'Username has been taken already',
      });
      return;
    }

    const dbUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    User.init()
      .then(async () => {
        await dbUser.save();
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          if (err.errors['username']) {
            res.status(401).json({
              success: false,
              message: err.errors['username'].message,
            });
          } else if (err.errors['email']) {
            res.status(401).json({
              success: false,
              message: err.errors['email'].message,
            });
          } else if (err.errors['password']) {
            res.status(401).json({
              success: false,
              message: err.errors['password'].message,
            });
          } else {
            throw err;
          }
        }
      });
  } catch (err) {
    if (!res.headersSent)
      res.status(400).json({ success: false, message: 'An error occurred' });
    console.error(err);
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const userLoggingIn: IUser = req.body;

    const dbUser = await User.findOne(
      { username: userLoggingIn.username },
      '+password'
    );

    if (!dbUser) {
      res.status(400).json({ message: 'Invalid username' });
      return;
    }

    const isPwdCorrect = await bcrypt.compare(
      userLoggingIn.password,
      dbUser.password
    );
    if (isPwdCorrect) {
      const payload = {
        id: dbUser.id,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw res.json({ error: err });
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      res.status(200).json({ success: false, message: 'Invalid password' });
    }
  } catch (err) {
    if (!res.headersSent)
      res.status(400).json({ success: false, message: 'An error occured' });
    console.error(err);
  }
};

export { verifyUser, signUp, logIn };
