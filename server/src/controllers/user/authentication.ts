import User from '../../models/user.js';
import IUser from '../../types/model/user.js';
import IJwtPayLoad from '../../types/IJwtPayLoad.js';

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
      token: 'Bearer ' + newToken,
    });
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(500).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    if (await User.findOne({ username: user.username }))
      throw new Error('Username already exists');

    const dbUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    User.init()
      .then(async () => {
        await dbUser.save();
        res.status(200).json({});
      })
      .catch((err) => {
        if (err instanceof Error.ValidationError) {
          const errorFields = ['username', 'email', 'password'];
          const errorMessage = errorFields.find(
            (field) => (err as Error.ValidationError).errors[field]
          );

          if (errorMessage) {
            res
              .status(422)
              .json({ error: { message: err.errors[errorMessage].message } });
          } else {
            res.status(500).json({ error: { message: 'An error occured' } });
          }
        } else {
          res.status(500).json({ error: { message: 'An error occured' } });
        }
      });
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const userLoggingIn: IUser = req.body;

    const dbUser = await User.findOne(
      { username: userLoggingIn.username },
      'password'
    );

    if (!dbUser) throw new Error('Invalid username');

    const isPwdCorrect = await bcrypt.compare(
      userLoggingIn.password,
      dbUser.password
    );

    if (isPwdCorrect) {
      jwt.sign(
        { id: dbUser.id } as IJwtPayLoad,
        process.env.JWT_SECRET!,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw res.json({ error: err });
          res.json({
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      throw new Error('Password is incorrect');
    }
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

export { verifyUser, signUp, logIn };
