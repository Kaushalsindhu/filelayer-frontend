import { useState, useEffect } from "react";
import { addCollaborator, getCollaborators, toggleRole, removeCollaborator } from "../../api/file.api";

const shareModal = ({ fileId , onClose }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("viewer");
  const [collaborators, setCollaborators] = useState([]);
  const [activeCollab, setActiveCollab] = useState(null);

  const fetchCollaborators = async () => {
    const data = await getCollaborators(fileId);
    setCollaborators(data);
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCollaborator(fileId, { username, role });
    setUsername("");
    setRole("viewer");
    fetchCollaborators();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px] shadow-lg" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Share File</h2>
          <button onClick={onClose} className="text-gray-500">✖</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="viewer"
                checked={role === "viewer"}
                onChange={() => setRole("viewer")}
              />
              Viewer
            </label>

            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="editor"
                checked={role === "editor"}
                onChange={() => setRole("editor")}
              />
              Editor
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Collaborator
          </button>
        </form>

        {/* Divider */}
        <hr className="my-4" />

        {/* Collaborators List */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-600">
            People with access
          </h3>

          {collaborators.length === 0 ? (
            <p className="text-sm text-gray-400">No collaborators yet</p>
          ) : (
            <div className="max-h-40 overflow-y-auto space-y-2">
              {collaborators.map((collab) => (
                <div key={collab.user._id} className="relative">
                    
                    {/* Row */}
                    <div
                    onClick={() =>
                        setActiveCollab(
                        activeCollab === collab.user._id ? null : collab.user._id
                        )
                    }
                    className="flex justify-between items-center px-2 py-2 border rounded cursor-pointer hover:bg-gray-50"
                    >
                    <span className="text-sm text-gray-700">
                        {collab.user.username}
                    </span>

                    <span
                        className={`text-xs px-2 py-1 rounded ${
                        collab.role === "editor"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {collab.role}
                    </span>
                    </div>

                    {/* Actions */}
                    {activeCollab === collab.user._id && (
                    <div className="mt-1 ml-2 bg-white border rounded shadow text-sm">
                        
                        <button
                        className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                        onClick={async (e) => {
                            e.stopPropagation();
                            await toggleRole(fileId, collab.user._id);
                            fetchCollaborators();
                        }}
                        >
                        Toggle Role
                        </button>

                        <button
                        className="block w-full text-left px-3 py-1 text-red-600 hover:bg-gray-100"
                        onClick={async (e) => {
                            e.stopPropagation();
                            await removeCollaborator(fileId, collab.user._id);
                            fetchCollaborators();
                        }}
                        >
                        Remove
                        </button>

                    </div>
                    )}
                </div>
                ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default shareModal;