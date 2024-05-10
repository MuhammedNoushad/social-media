import IUserDetails from "./IUserDetails";

interface IConnection {
  _id: string;
  following?: IUserDetails[];
  followers?: IUserDetails[];
}

export interface IConnectionState {
  connection: IConnection[];
}

export default IConnection;
