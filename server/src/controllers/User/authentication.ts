import User from '../../models/user';
import IUser from '../../types/user';

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers['x-access-token'] as string)?.split(' ')[1];

    try {
      if (token) {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (req) {
          (<any>req).user = {};
          (<any>req).user.id = decoded.id;
          (<any>req).user.username = decoded.username;
          next();
        }
      } else {
        throw 'Failed To Authenticate';
      }
    } catch (err) {
      console.error(err);

      throw res.json({
        isLoggedIn: false,
        message: 'Failed to Authenticate',
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;

    const isUsernameTaken = await User.findOne({ username: user.username });
    const isEmailTaken = await User.findOne({ email: user.email });

    if (isUsernameTaken && isEmailTaken) {
      res.json({ message: 'Username and email has been taken' });
    } else if (isUsernameTaken) {
      res.json({ message: 'Username has been taken' });
    } else if (isEmailTaken) {
      res.json({ message: 'Email has been taken' });
    } else {
      user.password = await bcrypt.hash(user.password, 10);

      const dbUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
      });

      dbUser.save();
      res.status(200).json({ message: 'Success' });
    }
  } catch (err) {
    console.error(err);
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const userLoggingIn: IUser = req.body;

    const dbUser = await User.findOne({ username: userLoggingIn.username });
    if (!dbUser) {
      throw res.status(200).json({ message: 'Invalid username' });
    }

    const isPwdCorrect = await bcrypt.compare(
      userLoggingIn.password,
      dbUser.password
    );
    if (isPwdCorrect) {
      const payload = {
        id: dbUser.id,
        username: dbUser.username,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw res.json({ message: err });
          res.json({
            message: 'Success',
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      throw res.json({ message: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
  }
};

export { verifyJWT, signUp, logIn };