import CreateAdForm from "../../../components/admin/ads/CreateAdForm";
import AdminSidebar from "../../../components/admin/common/AdminSidebar";

function CreateAds() {
    return (
        <div className="flex h-screen">
          <div>
            <AdminSidebar />
          </div>
          <div className="flex-grow flex justify-center px-4 sm:px-0">
            <CreateAdForm />
          </div>
        </div>
      );
}

export default CreateAds;
