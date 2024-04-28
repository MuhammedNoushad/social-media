export default interface IUserState {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profileimg?: string;
  email?: string;
  dob?: string;
  bio?: string;
  phone?: number;
  isBlock?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
}
