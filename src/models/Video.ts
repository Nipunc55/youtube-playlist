import mongoose, { Document, Schema } from "mongoose";

interface IVideo extends Document {
  url: string;
  categoryId?: mongoose.Types.ObjectId;
  likes?: number;
  description?: string;
  createdAt: Date;
}

const VideoSchema: Schema = new Schema({
  url: { type: String, required: true, unique: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  likes: { type: Number, default: 0 },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);
