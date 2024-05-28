import AdminSidebar from "../../../components/admin/common/AdminSidebar";
import DashboradCard from "../../../components/admin/dashboard/DashboradCard";
import LatestUsers from "../../../components/admin/dashboard/LatestUser";
import LineChart from "../../../components/admin/dashboard/LineChart";

function AdminHome() {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-2/12">
        <AdminSidebar />
      </div>
      <div className="w-10/12 mt-5 py-6 flex flex-col gap-8">
        <div className="mr-4 p-4">
          <DashboradCard />
        </div>
        <div className="mx-4 p-4 flex justify-center h-32rem min:h-max">
          <LineChart />
        </div>
        <div className="mr-4 p-4">
          <LatestUsers />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
