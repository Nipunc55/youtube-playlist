import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  videoId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
