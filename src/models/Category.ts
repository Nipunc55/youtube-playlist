import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  category: string;
  description?: string;
}

const CategorySchema: Schema = new Schema({
  category: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
