import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

interface ICategory {
  category: string;
  description?: string;
}

export default async function addCategory(
  categoryData: ICategory
): Promise<any | null> {
  await dbConnect();

  try {
    const newCategory = new Category(categoryData);
    const result = await newCategory.save();

    return result || null;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}
