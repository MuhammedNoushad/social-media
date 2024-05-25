import AdManagementTable from "../../../components/admin/ads/AdManagementTable";
import AdminSidebar from "../../../components/admin/common/AdminSidebar";

function AdManagement() {
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar />
      </div>
      <div className="flex-grow flex justify-center px-4 sm:px-0">
        <AdManagementTable />
      </div>
    </div>
  );
}

export default AdManagement;
