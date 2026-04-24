import { useState } from "react";
import { moveFile } from "../../api/file.api";

const MoveModal = ({ fileId, onClose, refresh }) => {
  const [folderName, setFolderName] = useState("");

  const handleMove = async () => {
    if (!folderName.trim()) return;

    await moveFile(fileId, folderName);
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Move File</h2>

        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleMove}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveModal;