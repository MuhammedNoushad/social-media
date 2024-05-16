import { useCallback, useEffect, useState } from "react";
import SearchInput from "../../common/SearchInput";
import UserCardList from "./UserCardList";
// import useFetchAllUsers from "../../../hooks/user/useFetchAllUsers";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import IUserState from "../../../types/IUserState";
import axios from "../../../axios/axios";

const SearchModal = ({ isOpen }: { isOpen: boolean; onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState<IUserState[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userDetails = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/users");
        const data = response.data.usersData;

        if (data) {
          setUsersData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Function to handle search query change
  const handleSearchQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const filteredUsers = searchQuery
    ? usersData.filter(
        (user) =>
          user._id !== userDetails._id &&
          (user.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().startsWith(searchQuery.toLowerCase()))
      )
    : [];

  return isOpen ? (
    <div
      className={`fixed left-16 top-0 bottom-0 w-80 mt-5 p-2 bg-white border-x-4 border-l-red-500 z-50 transform translate-x-0 transition-transform ease-in-out duration-800`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <SearchInput onChange={handleSearchQueryChange} value={searchQuery} />
      </div>
      <div className="overflow-y-auto">
        <UserCardList users={filteredUsers} />
      </div>
    </div>
  ) : null;
};

export default SearchModal;
