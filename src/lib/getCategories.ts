import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

async function getAllCategories() {
  await dbConnect();

  try {
    const categories = await Category.find({});
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export default getAllCategories;
