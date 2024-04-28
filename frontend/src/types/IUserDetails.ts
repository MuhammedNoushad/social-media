export default interface IUserDetails {
  _id: string;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  bio?: string;
  dob?: string;
  profileimg?: string;
  phone?: number;
  isBlock?: boolean;
  isAdmin?: boolean;
}
