import { useNavigate } from "react-router-dom";
import IUserDetails from "../../../types/IUserDetails";

const ConnectionModal = ({
  followers,
  following,
  onClose,
  type,
}: {
  followers: IUserDetails[];
  following: IUserDetails[];
  onClose: () => void;
  type: "followers" | "following" | "";
}) => {
  const navigate = useNavigate();

  const userList = type === "followers" ? followers : following;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900 font-roboto-condensed"
                  id="modal-headline"
                >
                  {type === "followers" ? "Followers" : "Following"}
                </h3>
                {userList.length > 0 ? (
                  <div className="mt-2">
                    <ul className="list-none">
                      {userList.map((user) => (
                        <li
                          onClick={() => navigate(`/profile/${user._id}`)}
                          key={user._id}
                          className="cursor-pointer flex items-center py-2 hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out"
                        >
                          <img
                            src={user.profileimg || "/public/avathar.jpeg"}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-10 h-10 rounded-full object-cover mr-4"
                          />
                          <div className="text-sm text-gray-700 font-roboto-condensed">
                            {user.firstName} {user.lastName}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-4 text-gray-500">
                    {type === "followers"
                      ? "You don't have any followers yet."
                      : "You are not following anyone yet."}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionModal;
