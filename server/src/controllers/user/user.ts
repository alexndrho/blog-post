import UserIcon from '../../models/userIcon.js';
import User from '../../models/user.js';
import IUser from '../../types/model/user.js';

import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { fileTypeFromBuffer } from 'file-type';

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ ...user._doc });
  } catch (err) {
    if (!res.headersSent) res.json({ success: false });
    console.error(err);
  }
};

const getUserIcon = async (req: Request, res: Response) => {
  try {
    const userIcon = await UserIcon.findOne({ userId: req.user?.id });

    if (!userIcon) {
      res.status(404).json({ success: false, message: 'User icon not found' });
      return;
    }

    res.status(200).json({ ...userIcon._doc });
  } catch (err) {
    if (!res.headersSent) res.json({ success: false });
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

      const fileType = await fileTypeFromBuffer(req.file.buffer);
      const mime = fileType?.mime;

      if (mime === undefined) {
        res.status(400).json({ success: false, message: 'Error file' });
        return;
      } else if (mime !== 'image/png' && mime !== 'image/jpeg') {
        res.status(422).json({ success: false, message: 'Invalid file type' });
        return;
      }

      const fileMB = req.file.buffer.byteLength / 1024 / 1024;

      console.log(fileMB);
      if (fileMB > 1) {
        res.status(422).json({
          success: false,
          message: 'Please upload a picture smaller than 1 MB',
        });
        return;
      }

      const userIcon = await UserIcon.findOne({ userId: user._id });
      if (userIcon) {
        userIcon.name = iconName;
        userIcon.image = req.file.buffer;
        userIcon.mime = mime;
        userIcon.save();

        user.profileIconId = userIcon._id;
      } else {
        const userIcon = new UserIcon({
          userId: user._id,
          name: iconName,
          image: req.file.buffer,
          mime: mime,
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

    await user.save();
    res.json({ success: true });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      if (err.errors.username) {
        res
          .status(422)
          .json({ success: false, message: err.errors['username'].message });
        return;
      } else if (err.errors.email) {
        res
          .status(422)
          .json({ success: false, message: err.errors['email'].message });
        return;
      } else if (err.errors.password) {
        res
          .status(422)
          .json({ success: false, message: err.errors['password'].message });
        return;
      } else if (err.errors.firstName) {
        res
          .status(422)
          .json({ success: false, message: err.errors['firstName'].message });
        return;
      } else if (err.errors.lastName) {
        res
          .status(422)
          .json({ success: false, message: err.errors['lastName'].message });
        return;
      } else if (err.errors.location) {
        res
          .status(422)
          .json({ success: false, message: err.errors['location'].message });
        return;
      } else if (err.errors.contact) {
        res
          .status(422)
          .json({ success: false, message: err.errors['contact'].message });
        return;
      } else {
        res.status(422).json({ success: false, message: 'An error occured' });
        console.error(err);
        return;
      }
    }
  }
};

export { getUserInfo, getUserIcon, updateUser };
