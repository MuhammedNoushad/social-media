import { toast } from "sonner";
import useFetchAllConnections from "../../../hooks/user/useFetchAllConnections";
import useFollow from "../../../hooks/user/useFollow";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const FriendSuggestion = () => {
  const { suggestedUsers, setSuggestedUsers } = useFetchAllConnections();
  const { follow, loadingFollow, followingUserId } = useFollow();

  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  // Function for handle follow user
  const handleFollow = async (userId: string) => {
    try {
      const followed = await follow(user._id, userId);

      if (followed) {
        setSuggestedUsers((suggestedUsers) =>
          suggestedUsers.filter((u) => u._id !== userId)
        );
      }
    } catch (error) {
      toast.error("Error following user");
    }
  };

  return (
    <div className="bg-white font-roboto-condensed">
      <div className="max-w-sm mx-auto my-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-2 mb-2 font-semibold">Suggested for you</div>
          <ul className="divide-y divide-gray-200">
            {suggestedUsers.map((user, index) => (
              <li
                key={index}
                className="p-3 flex justify-between items-center user-card"
              >
                <div className="flex items-center">
                  <img
                    onClick={() => {
                      navigate(`/profile/${user._id}`);
                    }}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={user.profileimg || "/avathar.png"}
                    alt={user.username}
                  />
                  <span className="ml-3 font-medium">{user.username}</span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleFollow(user._id);
                    }}
                    className="font-medium text-blue-400 hover:text-blue-600 py-2 px-4 rounded"
                  >
                    {loadingFollow && followingUserId === user._id ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Follow"
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-sm mx-auto">
        <p className="text-center text-gray-500 text-xs">
          © 2024 <span className="font-bold text-black">YoYo</span> FROM
          SOMEONE
        </p>
      </div>
    </div>
  );
};

export default FriendSuggestion;
