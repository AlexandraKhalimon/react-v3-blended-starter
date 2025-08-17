export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface NewPost {
  title: string;
  body: string;
}