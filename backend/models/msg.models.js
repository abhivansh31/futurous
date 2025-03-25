import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

MessageSchema.methods.isLocked = function () {
  const now = new Date();
  const created = this.createdAt;
  const delivery = new Date(this.deliveryDate);
  const totalTimeFrame = delivery - created;
  const elapsedTime = now - created;
  return elapsedTime / totalTimeFrame > 0.1;
};

export const Message = mongoose.model("Message", MessageSchema);
