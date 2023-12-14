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
