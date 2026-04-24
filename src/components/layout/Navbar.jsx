import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "./AuthModal";
import logo from "../../assets/fileLayer-logo.png";
import SearchInput from "./SearchInput";

function Navbar() {
  const { user, logout, authModal, openLogin, openSignup, closeAuthModal } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-8 sticky top-0 z-40">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="File Layer Logo"
            className="w-30 h-12 object-contain"
          />
        </div>

        <div className="flex-1 flex justify-center px-6">
          <SearchInput />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {!user ? (
            <>
              <button
                onClick={openLogin}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </button>

              <button
                onClick={openSignup}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-sm"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">

              {/* Clickable User Section */}
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>

                <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-sm font-semibold text-gray-800">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden z-50">
                  
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </header>

      {authModal.isOpen && (<AuthModal/>)}
    </>
  );
}

export default Navbar;
