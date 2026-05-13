import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled document",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "owner field is required"],
    },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          default: "viewer",
        },
      },
    ],
    content: {
      type: Object,
      default: {
        ops: [],
      },
    },
  },
  {
    timestamps: true,
  },
);
const documentModel = mongoose.model("docs", documentSchema);

export default documentModel;
