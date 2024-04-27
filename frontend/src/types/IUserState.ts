export default interface IUserState {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  dob?:string;
  bio?:string;
  phone?:number;
  isBlock?:boolean,
  isAdmin?:boolean,
}
