import UserIcon from '../../models/userIcon.js';
import User from '../../models/user.js';

import { Request, Response } from 'express';
import IUser from '../../types/model/user.js';

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ ...user._doc });
  } catch (err) {
    if (!res.headersSent) res.json({ sucess: false });
    console.error(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

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
          userId: user._id,
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
    if (!res.headersSent) res.json({ sucess: false });
    console.error(err);
  }
};

export { getUserInfo, updateUser };
