import AdminSidebar from "../../../components/admin/common/AdminSidebar";
import UserMangementTable from "../../../components/admin/userManagement/UsersTable";

function UserManagement() {
  return (
    <div className="flex h-screen">
      <div>
        <AdminSidebar />
      </div>
      <div className="flex-grow flex  justify-center px-4 sm:px-0">
        <UserMangementTable />
      </div>
    </div>
  );
}

export default UserManagement;
