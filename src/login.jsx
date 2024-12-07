import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate async login
    setTimeout(() => {
      // In a real application, you'd verify credentials here.
      // If successful:
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition-all duration-700 ease-in-out scale-0 animate-[fadeInScale_0.7s_ease_forwards]"
        style={{ animationFillMode: "forwards", animationName: "fadeInScale" }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Please Log In
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Add a keyframe animation in a style tag or external CSS */}
      <style>
        {`
            @keyframes fadeInScale {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}
      </style>
    </div>
  );
}
