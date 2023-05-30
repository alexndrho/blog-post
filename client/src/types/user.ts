interface IUser {
  _id: string;
  username: string;
  email: string;
  profileIconId?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  contact?: string;
}

export type { IUser };
