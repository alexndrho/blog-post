import User from '../../models/user.js';
import IUser from '../../types/model/user.js';

import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { fileTypeFromBuffer } from 'file-type';

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) throw 'Unable to find user';

    res.status(200).json({ ...user._doc });
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

const getUserInfoByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username: username });

    if (!user) throw 'Unable to find user';

    res.status(200).json({ ...user._doc });
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

const getUsernameById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('username');

    if (!user) throw 'Unable to find user';

    res.status(200).json({ username: user.username });
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) throw 'Unable to find user';

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
        throw 'Unable to determine file type';
      } else if (mime !== 'image/png' && mime !== 'image/jpeg') {
        throw 'Please upload a PNG or JPEG image';
      }

      const fileMB = req.file.buffer.byteLength / 1024 / 1024;

      if (fileMB > 1) throw 'Please upload an image smaller than 1MB';

      user.icon = {
        name: iconName,
        image: req.file.buffer,
        mime: mime,
      };
    }

    const formData = req.body as Partial<IUser>;

    if (formData.username) {
      if (await User.findOne({ username: formData.username }))
        throw 'Username already taken';

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
    if (!res.headersSent) {
      if (err instanceof Error.ValidationError) {
        const errorFields = [
          'username',
          'email',
          'password',
          'firstName',
          'lastName',
          'location',
          'contact',
        ];
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
      } else if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

export { getUsernameById, getUserInfo, getUserInfoByUsername, updateUser };
