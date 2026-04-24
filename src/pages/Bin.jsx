import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FileList from "../components/files/FileList";
import { getDeletedFiles } from "../api/file.api";


const Bin = () => {
    const [files, setFiles] = useState([]);
    const { refreshFiles, triggerRefresh } = useOutletContext();

    useEffect(() => {
        const fetchFiles = async () => {
          try {
            const data = await getDeletedFiles();
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
            Deleted Files
            </span>
        </div>

        <FileList files={files} setFiles={setFiles} isBinPage={true} />
      </div>
    );
}

export default Bin;