import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/user/common/Sidebar";
import Post from "../../../components/user/home/Post";
import useFetchAllPosts from "../../../hooks/user/useFetchAllPosts";
import useFetchAllConnections from "../../../hooks/user/useFetchAllConnections";
import { RootState } from "../../../store/store";
import { setConnection } from "../../../store/features/connectionSlice";
import Story from "../../../components/user/home/Story";
import FriendSuggestion from "../../../components/user/home/FreindSuggession";

function UserHome() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user._id);
  const { fetchAllConnections } = useFetchAllConnections();
  const { fetchAllPosts } = useFetchAllPosts();

  // Fetch all posts
  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchAllPosts();
        const connections = await fetchAllConnections(userId);
        dispatch(setConnection(connections));
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [dispatch, fetchAllConnections, fetchAllPosts, userId]);

  return (
    <div className="flex h-screen">
      <div className="w-2/12">
        <Sidebar page="home" />
      </div>
      <div className="flex w-10/12">
        <div className="flex flex-col gap-2 lg:gap-10">
          <div className="grid justify-center w-10/12 gap:6 lg:gap-12">
            <Story />
          </div>
          <div className="grid justify-center my-auto  gap:6 lg:gap-12">
            <Post />
          </div>
        </div>
        <div className="p-4 m-2 w-full hidden lg:block">
          <FriendSuggestion />
        </div>
      </div>
    </div>
  );
}

export default UserHome;
