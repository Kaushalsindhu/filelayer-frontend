import axios from './axios';
import toast from "react-hot-toast";


export const uploadFile = async (file, parentFolder) => {
  const formData = new FormData();
  formData.append('file', file);
  if (parentFolder) formData.append("parentFolder", parentFolder);
  const response = await axios.post('/files', formData);
  
  return response;
};

export const uploadFolder = async (name, parentFolder) => {
  const payload = { name };
  if (parentFolder) payload.parentFolder = parentFolder;
  const response = await axios.post("/files/folder", payload);
  return response.data;
}

export const getFiles = async (parentFolder) => {
  const params = {};
  if (parentFolder) params.parentFolder = parentFolder;
  const res = await axios.get("/files", { params });
  return res.data;
};

export const getBreadcrumb = async (folderId) => {
  const res = await axios.get(`/files/breadcrumb/${folderId}`);
  return res.data;
}

export const getFileVersions = async (fileId) => {
  const res = await axios.get(`/files/${fileId}/versions`);
  return res.data;
}

export const uploadFileVersion = async (fileId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(`/files/${fileId}/versions`, formData);
  return res.data;
}

export const lockFile = async (fileId) => {
  try{
    const res = await axios.post(`/files/${fileId}/lock`);
    toast.success(res.data.message);
  }
  catch(err) {
    if (err.response.status === 409) toast.error("File is locked by another user");
    else toast.error("Error locking file");
  }
}

export const unlockFile = async (fileId) => {
  const res = await axios.post(`/files/${fileId}/unlock`);
  toast.success(res.data.message);
}

export const handleRestore = async (fileId, versionNumber) => {
  try{
    const res = await axios.post(`/files/${fileId}/versions/${versionNumber}/restore`, { versionNumber });
    toast.success(res.data.message);
  }
  catch(err){
    toast.error(err.response.data.message || "Error restoring version");
  }
}

export const renameFolder = async (folderId, newName) => {
  const res = await axios.put(`/files/${folderId}/rename`, { newName });
  toast.success("Folder renamed as " + newName);
}

export const openFile = async (fileId, latestVersion) => {
  const res = await axios.get(`/files/${fileId}/url`);
  window.open(res.data.url, "_blank");
}

export const deleteDocument = async (fileId) => {
  try{
    const res = await axios.delete(`/files/${fileId}`);
    toast.success(res.data.message || "File moved to bin"); 
  }
  catch(err){
    toast.error(err.response.data.message || "Error deleting file");
  }
}

export const getDeletedFiles = async () => {
  const res = await axios.get("/files/deleted");
  return res.data;
}

export const handleFileRestore = async (fileId) => {
  try{
    const res = await axios.post(`/files/${fileId}/restore`);
    toast.success(res.data.message);
  }
  catch(err){
    toast.error(err.response.data.message || "Error restoring file");
  } 
}

export const deleteForever = async (fileId) => {
  try{
    const res = await axios.delete(`/files/${fileId}/deleteForever`);
    toast.success(res.data.message || "File deleted permanently");
  }
  catch(err){    
    toast.error(err.response.data.message || "Error deleting file forever");
  }
}

export const getSharedFiles = async () => {
  const res = await axios.get("/files/shared");
  return res.data;
}

export const getCollaborators = async (fileId) => {
  const res = await axios.get(`/files/${fileId}/collaborators`);
  return res.data;
}

export const addCollaborator = async (fileId, {username, role}) => {
  try{
    const res = await axios.post(`/files/${fileId}/collaborators`, { username, role });
    toast.success(res.data.message || "Collaborator added successfully");
  }
  catch(err){
    toast.error(err.response.data.message || "Error adding collaborator");
  }
}

export const toggleRole = async(fileId, collabId) => {
  try{
    const res = await axios.patch(`/files/${fileId}/collaborators/${collabId}`);  
    toast.success(res.data.message || "Role updated successfully");
  }
  catch(err){
    toast.error(err.response.data.message || "Error updating role");
  } 
}

export const removeCollaborator = async (fileId, collabId) => {
  try{
    const res = await axios.delete(`/files/${fileId}/collaborators/${collabId}`);
    toast.success(res.data.message || "Collaborator removed successfully");
  }
  catch(err){
    toast.error(err.response.data.message || "Error removing collaborator");
  } 
}

export const moveFile = async (fileId, targetFolderName) => {
  try{
    const res = await axios.put(`/files/${fileId}/move`, { targetFolderName });  
    toast.success(res.data.message || "File moved successfully");
  }
  catch(err){
    toast.error(err.response.data.message || "Error moving file");
  }
} 

export const searchFiles = async (query) => {
  const res = await axios.get(`/files/search`, { params: { query } });
  return res.data;
};