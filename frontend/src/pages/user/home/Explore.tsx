import Sidebar from "../../../components/user/common/Sidebar";
import ExploreImageGallery from "../../../components/user/explore/ExploreImageGallery";

function Explore() {
  return (
    <div className="flex h-screen">
      <div className="w-2/12 ">
        <Sidebar page="explore" />
      </div>
      <div className="w-10/12 p-8 m-3 flex flex-col gap-10">
        <ExploreImageGallery />
      </div>
    </div>
  );
}

export default Explore;
