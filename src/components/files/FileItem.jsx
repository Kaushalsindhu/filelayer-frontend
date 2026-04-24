import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import getFileIcon from "../common/getFileIcon";
import { FaFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import VersionDrawer from "./VersionDrawer";
import ShareModal from "./ShareModal";
import MoveModal from "./MoveModal";
import { renameFolder, openFile, deleteDocument, handleFileRestore, deleteForever } from "../../api/file.api";

function FileItem ({ file, updateFile, isBinPage, isSearchResult }) {
  const navigate = useNavigate();
  const [showVersions, setShowVersions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const menuRef = useRef();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const outletContext = useOutletContext();
  const { triggerRefresh } = outletContext || {};

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu((prev) => !prev);
  };

  const openDocument = () => {
    if(isBinPage) return;
    if (file.type === "folder") navigate(`/myFiles/${file._id}`); 
    else openFile(file._id, file.latestVersion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRename();
    else if (e.key === "Escape") {
      setIsRenaming(false);
      setNewName(file.name);
    }
  };

  const handleRename = async () => {
    if (!newName.trim()) return;
    await renameFolder(file._id, newName);
    updateFile({ ...file, name: newName });
    setIsRenaming(false);
};

  return (
    <div 
      onClick={openDocument}
      className={`px-6 py-2 items-center border-b hover:bg-gray-50 cursor-pointer ${
        isSearchResult
          ? "flex gap-3" 
          : "grid grid-cols-[1fr_1fr_1fr_1fr_40px]"
      }`}
    >
      {/* Name + Icon */}
      <div className="flex items-center gap-3">
        <span className="text-xl">
          {file.type === "folder" ? (<FaFolder className="text-yellow-500 text-lg" />) : getFileIcon(file.name)}
        </span>
        {isRenaming ? (
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="border px-2 py-1 text-sm rounded w-full"
          />
        ) : (
          <span className="text-gray-700 font-medium">
            {file.name}
          </span>
        )}
      </div>

      {!isSearchResult && (<span className="text-gray-500">
        {isRenaming ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRename();
            }}
            className="text-green-600 font-bold"
          >
            ✔
          </button>
        ) : (
          file.owner
        )}
      </span>
      )}

      {!isSearchResult && <span className="text-gray-500">{file.modified}</span>}
      {!isSearchResult && <span className="text-gray-500">{file.type === "folder" ? "--" : file.size}</span>}
        {!isSearchResult && (<div className="relative flex justify-center text-gray-600" ref={menuRef} onClick={toggleMenu}>
          {!isSearchResult && (
            <span> <FaEllipsisV className="text-gray-500 cursor-pointer" /> </span>
          )}
          {showMenu && !isBinPage && (
            <div className="absolute right-0 top-6 w-36 bg-white border rounded-lg shadow-lg z-50">
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={(e) => {openDocument()}}
              >
                Open
              </button>
              {file.type === "folder" && (
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRenaming(true);
                    setShowMenu(false);
                  }}
                >
                  Rename
                </button>
              )}
              {file.type === "file" && (
                <>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowShareModal(true);
                      setShowMenu(false);
                    }}
                  >
                    Share
                  </button>

                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVersions(true);
                      setShowMenu(false);
                    }}
                  >
                    View Versions
                  </button>

                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMoveModal(true);
                      setShowMenu(false);
                    }}
                  >
                    Move to
                  </button>
                </>
              )}

              <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={async (e) => { 
                  await deleteDocument(file._id); 
                  triggerRefresh();
                  setShowMenu(false); 
                }}
              >
                Delete
              </button>
            </div>
          )}

          {showMenu && (isBinPage) && (
            <div className="absolute right-0 top-6 w-36 bg-white border rounded-lg shadow-lg z-50">
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"  
                onClick = {async () => {
                  await handleFileRestore(file._id);
                  triggerRefresh();
                  setShowMenu(false);
                }}
              >
                Restore
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={async () => {
                  await deleteForever(file._id, true);
                  triggerRefresh();
                  setShowMenu(false);
                }}  
              >
                Delete Forever
              </button>
            </div>
          )}

          {showVersions && (
            <VersionDrawer
              name = {file.name}
              fileId={file._id}
              onClose={() => setShowVersions(false)}
            />
          )}    

          {showShareModal && (
            <ShareModal
              fileId={file._id}
              onClose={() => setShowShareModal(false)}
            />
          )}

          {showMoveModal && (
            <MoveModal
              fileId={file._id}
              onClose={() => setShowMoveModal(false)}
              refresh={triggerRefresh}
            />
          )}
        </div>
        )}
    </div>
  );
  
};

export default FileItem;
