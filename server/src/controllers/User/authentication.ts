import User from '../../models/user';
import IUser from '../../types/user';
import IJwtPayLoad from '../../types/IJwtPayLoad';

import { Request, Response, NextFunction } from 'express';
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
        (<any>req).user.id = decoded.id;

        const newToken = jwt.sign(
          { id: decoded.id } as IJwtPayLoad,
          process.env.JWT_SECRET!,
          { expiresIn: 86400 }
        );

        req.headers['x-access-token'] = 'Bearer ' + newToken;
        next();
      } else {
        throw 'Failed To Authenticate';
      }
    } catch (err) {
      throw res.status(400).json({
        isLoggedIn: false,
        error: 'Failed to Authenticate',
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
      res.status(400).json({ error: 'Username and email has been taken' });
    } else if (isUsernameTaken) {
      res.status(400).json({ error: 'Username has been taken' });
    } else if (isEmailTaken) {
      res.status(400).json({ error: 'Email has been taken' });
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
      throw res.status(400).json({ error: 'Invalid username' });
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
            message: 'Success',
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      throw res.json({ error: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
  }
};

export { verifyJWT, signUp, logIn };
