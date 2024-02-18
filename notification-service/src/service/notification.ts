import { NotificationModel } from "@notifications/models/notification";

interface NotificationData {
    title:string;
    description:string;
    userId:string;
}

const createNotification = async (data:NotificationData)=>{
try {
  const result = await NotificationModel.create(data); 
  return result ?? {}; 
} catch (error) {
   console.log(error); 
}
}

const getNotificationByUserId = async(userId:string) =>{
try {
   const result = await NotificationModel.find().where({
    userId:userId
   });
   return result ?? []; 
} catch (error) {
   console.log(error); 
}
}
export {createNotification,getNotificationByUserId};