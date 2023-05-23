import User from '../../models/user';
import IUser from '../../types/model/user';
import IJwtPayLoad from '../../types/IJwtPayLoad';

import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers['x-access-token'] as string)?.split(' ')[1];

    try {
      if (token) {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as IJwtPayLoad;

        (<any>req).user = {};

        const newToken = jwt.sign(
          { id: decoded.id } as IJwtPayLoad,
          process.env.JWT_SECRET!,
          { expiresIn: 86400 }
        );

        req.headers['x-access-token'] = 'Bearer ' + newToken;
        next();
      } else {
        res.status(400).json({
          isLoggedIn: false,
          error: 'Failed to Authenticate',
        });
      }
    } catch (err) {
      if (res.headersSent) {
        res.status(400).json({
          isLoggedIn: false,
          error: 'An error occured',
        });
      }
      console.error(err);
    }
  } catch (err) {
    if (res.headersSent) {
      res.status(400).json({ isLoggedIn: false, message: 'An error occured' });
    }
    console.error(err);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;

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
        if ((<any>err).message.indexOf('duplicate key error') !== -1) {
          if ((<any>err).message.includes('username')) {
            res.status(409).json({
              success: false,
              message: 'Username has been taken already',
            });
          }
        } else if (err instanceof Error.ValidationError) {
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
    if (res.headersSent) {
      res.status(400).json({ success: false, message: 'An error occurred' });
    }
    console.error(err);
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const userLoggingIn: IUser = req.body;

    const dbUser = await User.findOne({ username: userLoggingIn.username });
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
    if (res.headersSent) {
      res.status(400).json({ success: false, message: 'An error occured' });
    }
    console.error(err);
  }
};

export { verifyJWT, signUp, logIn };
