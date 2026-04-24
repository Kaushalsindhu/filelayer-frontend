import { useState } from "react";
import { uploadFile } from "../../api/file.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function UploadModal({ onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { folderId } = useParams();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadFile(file, folderId || null);
      onUploadSuccess();
      onClose();
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4"> Upload File </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;