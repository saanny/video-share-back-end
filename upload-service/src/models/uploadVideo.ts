import { Schema, model } from 'mongoose';

const uploadVideoSchema: Schema = new Schema(
    {
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const UploadVideoModel = model('UploadVideo', uploadVideoSchema, 'upload-video');
export { UploadVideoModel };
