import mongoose from "mongoose";
interface ICourse extends Document {
  title: string;
  videos?: mongoose.Types.ObjectId;
  likes?: number;
  description?: string;
  createdAt: Date;
}
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  likes: { type: Number, default: 0 },
});

export default mongoose.models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema);
