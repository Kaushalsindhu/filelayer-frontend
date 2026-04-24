import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaHome, FaFolder, FaUsers, FaTrash } from "react-icons/fa";
import Navbar from "./Navbar";
import UploadModal from "../files/UploadModal";
import CreateFolderModal from "../files/CreateFolderModal";

function AppLayout({ children }) {
  const { user } = useAuth();
  const menuRef = useRef(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(0);

  const triggerRefresh = () => { setRefreshFiles(Date.now())};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowUploadMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {document.removeEventListener("mousedown", handleClickOutside)};
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        {user && (
          <aside className="w-64 bg-gray-50 text-gray-700 p-6 shadow-right shadow-xl fixed top-16 left-0 h-[calc(100vh-4rem)]">
            <h2 className="text-3xl text-center font-semibold mb-20 mt-4">
              File Layer
            </h2>

            <button
              onClick={() => setShowUploadMenu(!showUploadMenu)}
              className="flex items-center gap-2 bg-white text-gray-700 font-medium px-3 py-2 rounded-lg border-4 border-blue-500 shadow hover:scale-105 transition mb-6"
            >
              <span className="text-lg font-bold">+</span>
              New
            </button>

            {showUploadMenu && (
              <div className="absolute w-40 bg-white border rounded-lg shadow-lg" ref={menuRef}>
                <button
                  onClick={() => {
                    setShowUpload(true);
                    setShowUploadMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Upload File
                </button>

                <button
                  onClick={() => {
                    setShowCreateFolder(true);
                    setShowUploadMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  New Folder
                </button>
              </div>
            )}

            <ul className="space-y-3 text-md">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive  
                    ? "bg-blue-500 text-white shadow-md" 
                    : "bg-blue-200 text-gray-700 hover:bg-blue-400 hover:text-white"}`
                }
                replace
              >
                <FaHome className="text-md"/>
                Dashboard
              </NavLink>

              <NavLink
                to="/myFiles"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? "bg-blue-500 text-white shadow-md" 
                    : "bg-blue-200 text-gray-700 hover:bg-blue-400 hover:text-white"}`
                }
                replace  
              >
                <FaFolder className="text-md" />
                My Files
              </NavLink>

              <NavLink
                to="/shared"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive  
                    ? "bg-blue-500 text-white shadow-md" 
                    : "bg-blue-200 text-gray-700 hover:bg-blue-400 hover:text-white"}`
                }
                replace
              >
                <FaUsers />
                Shared Files
              </NavLink>

              <NavLink
                to="/bin"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive  
                    ? "bg-blue-500 text-white shadow-md" 
                    : "bg-blue-200 text-gray-700 hover:bg-blue-400 hover:text-white"}`
                }
                replace
              >
                <FaTrash />
                Bin
              </NavLink>
            </ul>
          </aside>
        )}

        {/* main content */}
        <main className={`flex-1 px-6 py-4 ${user ? "ml-64" : ""}`}>
          <Outlet context={{ refreshFiles, triggerRefresh }} />
        </main>
      </div>
      
      {showUpload && (
        <UploadModal
          onClose={ () => setShowUpload(false)}
          onUploadSuccess={triggerRefresh}
        />
      )}

      {showCreateFolder && (
        <CreateFolderModal onClose={() => setShowCreateFolder(false)} />
      )}

    </div>
  );
}

export default AppLayout;