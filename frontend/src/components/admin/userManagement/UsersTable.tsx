import React, { useState } from "react";
import useUsersData from "../../../hooks/admin/useUsersData";
import useBlockUser from "../../../hooks/admin/useBlockUser";
import axios from "../../../axios/axios";

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

  // Function for formating the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
                          src="data:image/jpeg;base64,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"
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
