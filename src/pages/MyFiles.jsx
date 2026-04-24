import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import FileList from "../components/files/FileList";
import { getFiles, getBreadcrumb } from "../api/file.api";

const MyFiles = () => {
  const { folderId } = useParams();
  const { refreshFiles } = useOutletContext();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getFiles(folderId || null);
        setFiles(data);

        if (folderId) {
          const path = await getBreadcrumb(folderId);
          setBreadcrumb(path);
        } else {
          setBreadcrumb([]);
        } 
      } catch (err) {
        console.error(err);
      }
    };
    fetchFiles();
  }, [folderId, refreshFiles]);

  return (
    <div className="p-6">
      <div className="mb-4 text-3xl font-semibold text-gray-700 flex items-center gap-2 flex-wrap">
        <span
          onClick={() => navigate("/myFiles")}
          className="cursor-pointer hover:text-blue-600"
        >
          My Files
        </span>

        {breadcrumb.map((folder, index) => (
          <span key={folder._id} className="flex items-center gap-2">
            <span>/</span>
            <span
              onClick={() => navigate(`/myFiles/${folder._id}`)}
              className="cursor-pointer hover:text-blue-600"
            >
              {folder.name}
            </span>
          </span>
        ))}
      </div>
      <FileList files={files} setFiles={setFiles} />
    </div>
  );
};

export default MyFiles;
