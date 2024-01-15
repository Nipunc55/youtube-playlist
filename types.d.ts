/** @format */

type videos = {
  url: string;
  category_id: number | null;
  likes: number | null;
  category: string;
  // hasLiked: number | null;
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
type tokenParams = {
  user_id: number | null;
  username: string;
  email: string;
};
type authData = {
  user_id: number | null;
  username: string;
  email: string;
};
