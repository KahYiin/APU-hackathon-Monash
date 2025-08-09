// src/pages/LoginPage.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user_id", data.user.id);
        setMessage("✅ Login successful!");
        window.location.href = "/wallet";
      } else {
        setMessage(`❌ ${data.error || "Login failed"}`);
      }
    } catch (err) {
      setMessage("⚠️ Server error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden p-6"
      style={{
        backgroundImage: `
      linear-gradient(135deg, rgba(237,230,208,0.9) 0%, rgba(217,203,163,0.85) 40%, rgba(195,180,126,0.85) 100%),
      url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80')
    `
      }}
    >
      {/* Floating blurred shapes */}
      <div className="absolute w-80 h-80 bg-[#E8E1C8]/30 rounded-full top-8 left-8 blur-3xl animate-pulse"></div>
      <div className="absolute w-[28rem] h-[28rem] bg-[#B4BD81]/30 rounded-full bottom-8 right-8 blur-3xl animate-pulse delay-300"></div>

      {/* Login Card */}
      <motion.form
        onSubmit={handleLogin}
        className="relative z-10 bg-[#fffaf0]/90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-8 border border-[#e6dcc2]/50"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold text-[#4C3D19] mb-6 text-center">
          Welcome Back
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-semibold ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : message.includes("❌")
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border-2 border-[#C6B96F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A1B556]/50 text-[#4e4725] mb-4 bg-white/70 placeholder:text-[#8c7f4a]"
          required
        />

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-[#C6B96F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A1B556]/50 text-[#4e4725] pr-12 bg-white/70 placeholder:text-[#8c7f4a]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7041] hover:text-[#5f562e] outline-none focus:outline-none bg-transparent border-none p-0"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#8BA04B] to-[#73893F] text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition text-base font-semibold active:scale-95"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-[#4e4725]">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#8BA04B] font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </motion.form>
    </div>
  );
}
