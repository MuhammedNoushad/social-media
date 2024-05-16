export default interface IUserState {
  map(arg0: (user: import("./IUserDetails.ts").default) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
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
