import { useEffect, useState } from "react";
import { getFileVersions, uploadFileVersion, lockFile, unlockFile, handleRestore } from "../../api/file.api";
import toast from "react-hot-toast";

const VersionDrawer = ({ name,fileId, onClose }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const res = await getFileVersions(fileId);
      setVersions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 translate-x-0">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-4 font-semibold">Version History</h2>
        <button className="mb-4" onClick={onClose}>✕</button>
      </div>
      <h3 className="text-lg font-medium mb-4">{name}</h3>

      <div className="mb-6 flex gap-5">
        <button 
          className="border-2 p-2 bg-red-600 hover:bg-red-500 text-white"
          onClick={async() => {await lockFile(fileId);}}
        >
          Lock File
        </button>
        <button 
          className="border-2 p-2 bg-green-600 hover:bg-green-500 text-white"
          onClick={async() => {await unlockFile(fileId);}}
        >
          Unlock File
        </button>
      </div>

      {/* Upload new version */}
      <div className="mb-6">
        Upload new version:  
        <input
          type="file"
          className="mt-2 mb-4 border"
          onChange={async (e) => {
            await uploadFileVersion(fileId, e.target.files[0]);
            fetchVersions();
            e.target.value = null; // Reset file input
          }}
        />
      </div>

      {/* Version list */}
      {versions.map((v, index) => (
        <div
          key={v._id}
          className="border p-2 rounded mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">v{v.versionNumber}{index === 0 && "(Latest)"}</p>
            <p className="text-xs text-gray-500">
              {new Date(v.createdAt).toLocaleString()}
            </p>
          </div>

          {index !== 0 && (
            <button
              onClick={async () => {
                await handleRestore(fileId, v.versionNumber);
                fetchVersions();
              }}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
            >
              Restore
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default VersionDrawer;
