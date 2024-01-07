/** @format */

type videos = {
  url: string;
  category_id: number | null;
  likes: number | null;
  category: string;
};
type category = {
  category: string;
  id: number;
};
type video = {
  url: string;
  categoryId: number | null;
  likes: number | null;
};
type categoryName = {
  category: string;
};
type user = {
  user_id: number | null;
  username: string;
  email: string;

  passwordHash: string;
};
type inputUser = {
  username: string;
  email: string;
  password: string;
};
