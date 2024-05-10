interface IComment {
    userId: {
      _id: string;
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      isAdmin: boolean;
      isBlock: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
      bio: string;
      dob: string;
      phone: number;
      profileimg: string;
    };
    comment: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }

  export default IComment