import { useParams } from "react-router-dom";
import EditAdForm from "../../../components/admin/ads/EditAdForm";
import AdminSidebar from "../../../components/admin/common/AdminSidebar";

function EditAd() {
  const { adId } = useParams();
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar />
      </div>
      <div className="flex-grow flex justify-center items-center p-10 sm:px-0">
        <div className="w-1/2 m-auto">
          <EditAdForm adId={adId} />
        </div>
      </div>
    </div>
  );
}

export default EditAd;
