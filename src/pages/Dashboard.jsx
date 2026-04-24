import { useEffect, useState } from "react";
import StatCard from "../components/common/StatCard";
import RecentFiles from "../components/files/RecentFiles";
import { getDashboardData } from "../api/dashboard.api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        const res = await getDashboardData();
        if (mounted) setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDashboard();
    return () => (mounted = false);
  }, []);


  if (loading) return <div className="text-gray-500">Loading dashboard...</div>;
  if (!data) return <div className="text-red-500">Failed to load dashboard</div>;
  const { stats, recentFiles, recentActivity } = data;

  return (
    <div className="space-y-10 bg-blue-100 p-8 rounded-2xl">

      {/* Page Header */}
      <div className="bg-white rounded-2xl px-6 py-4  shadow-md border border-blue-200">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Overview of your files and recent activity
        </p>
      </div>


      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white border border-blue-300 rounded-xl p-6 px-10 shadow-md hover:shadow-lg hover:border-blue-400 transition duration-200">
          <StatCard title="My Files" value={stats.myFiles} />
        </div>

        <div className="bg-white border border-blue-300 rounded-xl p-6 px-10 shadow-md hover:shadow-lg hover:border-blue-400 transition duration-200">
          <StatCard title="Shared With Me" value={stats.sharedFiles} />
        </div>

        <div className="bg-white border border-blue-300 rounded-xl p-6 px-10 shadow-md hover:shadow-lg hover:border-blue-400 transition duration-200">
          <StatCard title="Deleted Files" value={stats.deletedFiles} />
        </div>

      </div>


      {/* Recent Files */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-200">
        <RecentFiles />
      </div>


      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          {recentActivity.map((log, i) => (
            <li
              key={i}
              className="flex justify-start items-center px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-200 border border-blue-300 transition"
            >
              <span className="text-gray-800 font-medium mx-5">
                {log.action}
              </span>
              <span className="text-gray-700">
                {log.file.originalName}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}       

export default Dashboard