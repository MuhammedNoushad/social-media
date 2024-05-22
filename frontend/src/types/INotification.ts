import IUserDetails from "./IUserDetails";

interface INotification {
    isRead: boolean;
    _id: string;
    from : IUserDetails;
    to : IUserDetails;
    type:string;
    createdAt: string;
}   

export default INotification