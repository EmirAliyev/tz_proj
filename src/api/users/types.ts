interface IName {
  title: string;
  first: string;
  last: string;
}

interface IPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface IDob {
  date: string;
  age: number;
}

export interface IUser {
  gender: string;
  name: IName;
  email: string;
  phone: string;
  picture: IPicture;
  dob: IDob;
  age: number;
}

export interface IUserResponse {
  results: IUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}