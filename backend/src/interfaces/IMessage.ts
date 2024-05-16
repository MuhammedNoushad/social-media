import IUsers from "./IUsers";

interface IMessage {
    sender: IUsers,
    receiver: IUsers,
    message: string,
}

export default IMessage