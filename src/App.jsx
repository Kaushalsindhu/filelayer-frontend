import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import MyFiles from "./pages/MyFiles";
import AppLayout from "./components/layout/AppLayout";
import Bin from "./pages/Bin";
import Shared from "./pages/Shared";

function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myFiles" element={<MyFiles />} />
          <Route path="/myFiles/:folderId" element={<MyFiles />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/shared" element={<Shared />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
