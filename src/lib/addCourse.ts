import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import mongoose from "mongoose";

interface ICourse {
  title: string;
  videos?: mongoose.Types.ObjectId;
  likes?: number;
  description?: string;
  createdAt: Date;
}
export default async function addCourse(
  courseData: ICourse
): Promise<any | null> {
  await dbConnect();

  try {
    const newCourse = new Course(courseData);
    const result = await newCourse.save();

    return result || null;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
}
