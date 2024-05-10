import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../../components/user/common/Sidebar";
import Post from "../../../components/user/home/Post";
import useFetchAllPosts from "../../../hooks/user/useFetchAllPosts";
import useFetchAllConnections from "../../../hooks/user/useFetchAllConnections";
import { RootState } from "../../../store/store";
import { setConnection } from "../../../store/features/connectionSlice";

function UserHome() {
  const userId = useSelector((state: RootState) => state.user._id);
  const { fetchAllConnections } = useFetchAllConnections();
  const { fetchAllPosts } = useFetchAllPosts();
  const dispatch = useDispatch();

  // Fetch all posts
  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchAllPosts();
        const connections = await fetchAllConnections(userId);
        console.log("dispatch", connections);
        dispatch(setConnection(connections));
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [dispatch, fetchAllConnections, fetchAllPosts, userId]);

  return (
    <div className="flex h-screen">
      <div className="w-2/12 ">
        <Sidebar />
      </div>
      <div className="w-10/12">
        <div className="grid justify-center my-auto w-8/12 gap:6 lg:gap-12 ">
          <Post />
        </div>
      </div>
    </div>
  );
}

export default UserHome;
