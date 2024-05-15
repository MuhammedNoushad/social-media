import axios from "../../axios/axios";
import { useState, useEffect, Dispatch } from "react";
import IUserState from "../../types/IUserState";

const useUsersData = (): {
  users: IUserState[];
  setUsers: Dispatch<IUserState[]>;
  totalPages: number;
  setTotalPages: Dispatch<number>;
} => {
  const [users, setUsers] = useState<IUserState[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/users?page=1");
        const data: IUserState[] = response.data.usersData;
        setUsers(data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { users, setUsers, totalPages, setTotalPages };
};

export default useUsersData;
