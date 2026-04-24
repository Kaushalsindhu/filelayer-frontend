import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const { openSignup, openLogin } = useAuth();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 overflow-hidden">

        {/* Background Blur Orbs */}
        <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 left-10"></div>
        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-40 right-10"></div>
        <div className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-20 left-1/2"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32">

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Your Files. <br />
            <span className="text-yellow-300">Anywhere.</span> Anytime.
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg text-blue-100 max-w-2xl">
            A powerful and secure cloud storage platform designed for
            collaboration, version control, and seamless file management.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <button
              onClick={openSignup}
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Start for Free
            </button>

            <button
              onClick={openLogin}
              className="px-8 py-3 bg-transparent border border-white text-white rounded-xl hover:bg-white/10 transition"
            >
              Login
            </button>
          </div>

          {/* Feature Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl w-full px-4">

            <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">🔐 Secure Storage</h3>
              <p className="text-sm text-blue-100">
                End-to-end protection ensures your data stays safe and private.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">🤝 Smart Sharing</h3>
              <p className="text-sm text-blue-100">
                Collaborate in real time with team members effortlessly.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl text-white shadow-xl hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-2">🕓 Version History</h3>
              <p className="text-sm text-blue-100">
                Track changes and restore previous versions anytime.
              </p>
            </div>

          </div>

        </div>
      </div>
  );
}