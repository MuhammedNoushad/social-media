import axios from "../../axios/axios";
import { useState, useEffect, Dispatch } from "react";
import IUserState from "../../types/IUserState";

const useUsersData = (): { users: IUserState[], setUsers: Dispatch<IUserState[]> } => {
  const [users, setUsers] = useState<IUserState[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        const data: IUserState[] = response.data.usersData;
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { users, setUsers };
};

export default useUsersData;
