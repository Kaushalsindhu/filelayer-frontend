import { useState, useEffect, useRef } from "react";
import { searchFiles } from "../../api/file.api";
import { useNavigate } from "react-router-dom";
import FileItem from "../files/FileItem";

function SearchInput() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!input.trim()) {
      setResults([]);
      setShow(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await searchFiles(input);
        setResults(data);
        setShow(true);
      } catch (err) {
        console.error("Search error", err);
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = (file) => {
    if (file.type === "folder") {
      navigate(`/myFiles/${file._id}`);
    } else {
      window.open(file.fileUrl, "_blank"); // or your openFile()
    }
    setShow(false);
  };

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search files..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-gray-100 border border-gray-300 rounded-full px-5 py-2 focus:bg-white focus:outline-none"
      />

      {show && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
           {results.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">No results found</p>
            ) : (
                results.map((file) => (
                <FileItem
                    key={file._id}
                    file={file}
                    isSearchResult={true}
                />
                ))
            )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
