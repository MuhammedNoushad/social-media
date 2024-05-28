import React from "react";
import useDashboardData from "../../../hooks/admin/useDashboardData";
import { useNavigate } from "react-router-dom";

interface LatestUsersProps {}

const LatestUsers: React.FC<LatestUsersProps> = () => {
  const { latestUsers } = useDashboardData();

  const navigate = useNavigate()
  return (
    <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900">
          Latest Customers
        </h3>
        <a
          onClick={()=>{navigate('/admin/user-management')}}
          className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {latestUsers.map((user) => (
            <li key={user._id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profileimg}
                    alt={user.username}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate font-roboto-condensed">
                    {user.username}
                  </p>
                  <p className="text-sm text-gray-500 truncate font-roboto-condensed">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LatestUsers;
