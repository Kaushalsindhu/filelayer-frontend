import { useState } from "react";
import { useParams } from "react-router-dom";
import { uploadFolder } from "../../api/file.api";
import toast from "react-hot-toast";

function CreateFolderModal({ onClose }) {
  const [name, setName] = useState("");
  const { folderId } = useParams();

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      const response = await uploadFolder(name, folderId || null);
      onClose();
      window.location.reload(); // temporary refresh,
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Error creating folder");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Create Folder</h2>

        <input
          type="text"
          placeholder="Folder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderModal;
