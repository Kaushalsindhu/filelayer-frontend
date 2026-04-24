import { useEffect, useState } from "react";
import { getDashboardData } from "../../api/dashboard.api";

function RecentFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    const fetchRecentFiles = async () => {
      try {
        const data = await getDashboardData();
        if (isMounted)  setFiles(data.recentFiles || []);
      } catch (err) {
        console.error("Failed to load recent files", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRecentFiles();

    return () => {isMounted = false;};
  }, []);

  if (loading) {
    return (
      <div className="bg-white border rounded-lg p-6 text-gray-500">
        Loading recent files...
      </div>
    );
  }
  return (
    <div className="bg-white border border-blue-200 rounded-2xl shadow-md overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-blue-100 border-b border-blue-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Files
        </h2>
      </div>

      {files.length === 0 ? (
        <div className="px-6 py-8 text-sm text-gray-600 bg-blue-50">
          No recent files found
        </div>
      ) : (
        <table className="w-full text-sm">
          
          {/* Table Head */}
          <thead className="bg-blue-50 text-gray-700 border-b border-blue-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Type</th>
              <th className="text-left px-6 py-3 font-medium">Version</th>
              <th className="text-left px-6 py-3 font-medium">Last updated</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800">
            {files.map((file) => (
              <tr
                key={file._id}
                className="border-b border-blue-100 hover:bg-blue-100/60 transition"
              >
                <td className="px-6 py-3 font-medium">
                  {file.originalName}
                </td>

                <td className="px-6 py-3 text-gray-700">
                  {file.isOwner ? "Owned" : "Shared"}
                </td>

                <td className="px-6 py-3 text-gray-700">
                  v{file.currentVersion}
                </td>

                <td className="px-6 py-3 text-gray-600">
                  {new Date(file.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RecentFiles;