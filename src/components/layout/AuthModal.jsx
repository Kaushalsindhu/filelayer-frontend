import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser, signupUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

function AuthModal() {
  const { login, authModal, openLogin, openSignup, closeAuthModal} = useAuth();
  const mode = authModal.mode;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const res = await loginUser(form);
        login(res);
      } else {
        const res = await signupUser(form);
        login(res);
      }

      closeAuthModal();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
            />
            </>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="text-sm text-center mt-4 text-gray-600">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={mode === "login" ? openSignup : openLogin}
            className="text-blue-600 font-medium ml-1 hover:text-blue-700 transition"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
