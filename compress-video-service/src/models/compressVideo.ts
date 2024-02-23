import { Schema, model } from "mongoose";

const compressVideoSchema: Schema = new Schema(
  {
    link: { type: String },
    quality: { type: String },
    userId: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

const CompressVideoModel = model(
  "CompressVideo",
  compressVideoSchema,
  "compress",
);
export { CompressVideoModel };
