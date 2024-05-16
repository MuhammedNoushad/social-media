import Sidebar from "../../../components/user/common/Sidebar";
import PostCreate from "../../../components/user/home/PostCreate";

function UserCreatePost() {
  return (
    <div className="flex h-screen">
      <div>
        <Sidebar page="create-post" />
      </div>
      <div className="flex-grow flex justify-center ">
        <PostCreate />
      </div>
    </div>
  );
}

export default UserCreatePost;
