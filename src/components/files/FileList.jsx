import FileItem from "./FileItem";

function FileList ({ files, setFiles, isBinPage=false }){

  const updateFile = (updatedFile) => {
    setFiles((prevFiles) => 
      prevFiles.map((f) => (f._id === updatedFile._id ? updatedFile : f))
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] px-6 py-3 text-sm font-semibold text-gray-500 border-b">
        <span>Name</span>
        <span>Owner</span>
        <span>Last Modified</span>
        <span>Size</span>
        <span></span>
      </div>

      {files.map((file) => (
        <FileItem key={file._id} file={file} updateFile={updateFile} isBinPage={isBinPage} />
      ))}
    </div>
  );
};

export default FileList;
