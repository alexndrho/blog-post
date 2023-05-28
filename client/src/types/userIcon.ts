interface IUserIcon {
  userId: string;
  name: string;
  image: {
    type: 'Buffer';
    data: number[];
  };
  mime: string;
}

export type { IUserIcon };
