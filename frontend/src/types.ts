interface IUser {
  id: string;
  email: string;
  name?: string;
  password: string;
  posts: IBlog[];
}

interface IBlog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: IUser;
  authorId: string;
}
