import Sidebar from "../../../components/user/common/Sidebar";
import Post from "../../../components/user/home/Post";

function UserHome() {
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
