import { Schema, model } from 'mongoose';

const notificationSchema: Schema = new Schema(
    {
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const NotificationModel = model('Notification', notificationSchema, 'notification');
export { NotificationModel };
