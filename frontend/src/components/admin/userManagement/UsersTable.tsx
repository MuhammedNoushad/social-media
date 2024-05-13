import React, { useState } from "react";
import useUsersData from "../../../hooks/admin/useUsersData";
import useBlockUser from "../../../hooks/admin/useBlockUser";
import axios from "../../../axios/axios";
import formatDate from "../../../utils/formatData";

const UserTable: React.FC = () => {
  const { users, setUsers } = useUsersData();
  const blockUser = useBlockUser();

  const [searchTerm, setSearchTerm] = useState("");

  // Function for handle search logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function for filtering the user data
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );


  const handleBlock = async (userId: string) => {
    try {
      await blockUser(userId); // Call the blockUser function from useBlockUser hook
      // After blocking/unblocking, fetch the updated user data again
      const response = await axios.get("/api/admin/users");
      const updatedUsers = response.data.usersData;
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-10 mx-auto sm:w-2/3 px-4 sm:px-8">
      <div className="py-8 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between mb-4 p-3 sm:p-0">
          <h2 className="text-sm sm:text-xl font-semibold mb-2 sm:mb-0">
            User Management
          </h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Created At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={user.profileimg || "/public/avathar.jpeg"}
                          alt={`${user.firstName} ${user.lastName}'s profile photo`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <span className="font-semibold">
                        {user.firstName} {user.lastName}
                      </span>
                      <br />
                      {user.email}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatDate(user.createdAt || "")}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm sm:table-cell">
                    <button
                      className={`px-3 py-1 rounded-md text-white ${
                        user.isBlock === true
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={() => handleBlock(user._id)} // Pass the user's ID to handleBlock function
                    >
                      {user.isBlock === true ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
