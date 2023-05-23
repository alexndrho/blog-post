import UserIcon from '../../models/userIcon';
import User from '../../models/user';

import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import IJwtPayLoad from '../../types/IJwtPayLoad';
import IUser from '../../types/model/user';

const updateUser = async (req: Request, res: Response) => {
  try {
    const token = (req.headers['x-access-token'] as string)?.split(' ')[1];

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: 'Failed to authenticate' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayLoad;
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (req.file) {
      const iconName =
        user._doc.username +
        '-' +
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9);

      const userIcon = await UserIcon.findOne({ userId: user._id });
      if (userIcon) {
        userIcon.name = iconName;
        userIcon.image = req.file.buffer;
        userIcon.save();

        user.profileIconId = userIcon._id;
      } else {
        const userIcon = new UserIcon({
          userId: decoded.id,
          name: iconName,
          image: req.file.buffer,
        });
        userIcon.save();

        user.profileIconId = userIcon._id;
      }
    }

    const formData = req.body as Partial<IUser>;

    if (formData.username) {
      if (await User.findOne({ username: formData.username })) {
        res
          .status(409)
          .json({ success: false, message: 'Username already exists' });
        return;
      }

      user.username = formData.username;
    }

    if (formData.email) {
      user.email = formData.email;
    }

    if (formData.password) {
      user.password = formData.password;
    }

    if (formData.firstName) {
      user.firstName = formData.firstName;
    }

    if (formData.lastName) {
      user.lastName = formData.lastName;
    }

    if (formData.location) {
      user.location = formData.location;
    }

    if (formData.contact) {
      user.contact = formData.contact;
    }

    user.save();
    res.json({ success: true });
  } catch (err) {
    if (res.headersSent) res.json({ sucess: false });
    console.error(err);
  }
};

export { updateUser };
