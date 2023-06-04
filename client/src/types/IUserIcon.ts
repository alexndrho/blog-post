import IError from './IError';

interface IUserIcon {
  userId: string;
  name: string;
  image: {
    type: 'Buffer';
    data: number[];
  };
  mime: string;
}

interface IUserIconResponse extends Partial<IUserIcon>, Partial<IError> {}

export default IUserIcon;
export type { IUserIconResponse };
