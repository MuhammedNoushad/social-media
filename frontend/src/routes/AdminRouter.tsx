import { Route, Routes } from "react-router-dom";
import UserManagement from "../pages/admin/profile/UserManagement";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  );
}

export default AdminRouter;
