import { Schema, model } from 'mongoose';

const uploadVideoSchema: Schema = new Schema(
  {
    file_name: String,
    resolution: String,
    ext: String,
    path_on_disk: String,
    userId:Schema.Types.ObjectId
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UploadVideoModel = model(
  'UploadVideo',
  uploadVideoSchema,
  'upload-video'
);

export { UploadVideoModel };
