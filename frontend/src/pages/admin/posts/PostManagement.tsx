import AdminSidebar from "../../../components/admin/common/AdminSidebar";
import PostManagementTable from "../../../components/admin/PostManagement/PostManagementTable";

function PostManagement() {
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar />
      </div>
      <div className="flex-grow flex  justify-center px-4 sm:px-0">
        <PostManagementTable />
      </div>
    </div>
  );
}

export default PostManagement;
