import { Schema, model }from 'mongoose';

const notificationSchema: Schema = new Schema(
    {
        description:{
            type:String
        },
         title:{
            type:String 
        },
        isRead:{
            type:Boolean,
            default:false
        },
        userId:{
            type:Number
        },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const NotificationModel = model('Notification', notificationSchema, 'notification');
export { NotificationModel };
