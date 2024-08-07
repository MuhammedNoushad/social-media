import CreateAdForm from "../../../components/admin/ads/CreateAdForm";
import AdminSidebar from "../../../components/admin/common/AdminSidebar";

function CreateAds() {
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar />
      </div>
      <div className="flex-grow flex justify-center items-center p-10 sm:px-0">
        <div className="w-1/2 m-auto">
          <CreateAdForm />
        </div>
      </div>
    </div>
  );
}

export default CreateAds;
