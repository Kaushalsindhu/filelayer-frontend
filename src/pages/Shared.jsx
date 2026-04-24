import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { getSharedFiles} from "../api/file.api";
import FileList from "../components/files/FileList";

const Shared = () => {
    const { refreshFiles } = useOutletContext();
    const [files, setFiles] = useState([]);

    useEffect(() => {
      const fetchFiles = async () => {
        try {
        const data = await getSharedFiles();
        setFiles(data);
        } catch (err) {
        console.error(err);
        }
      };
      fetchFiles();
    }, [refreshFiles]);

    return (
      <div className="p-6">
        <div className="mb-4 text-3xl font-semibold text-gray-700 flex items-center gap-2 flex-wrap">
          <span>
            Shared Files
          </span>
        </div>
        <FileList files={files} setFiles={setFiles} />
      </div>
    );
}   

export default Shared;