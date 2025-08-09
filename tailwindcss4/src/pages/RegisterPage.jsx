import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: "✅ User registered successfully!"
        });
        setFormData({ first_name: "", last_name: "", email: "", password: "" });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Registration failed"
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error. Try again later." });
    }

    setLoading(false);
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

      {/* Form Card */}
      <motion.div
        className="relative z-10 bg-[#fffaf0]/90 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-8 border border-[#e6dcc2]/50"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold text-[#4C3D19] mb-6 text-center">
          Create Your Account
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-semibold ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#C6B96F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A1B556]/50 text-[#4e4725] bg-white/70 placeholder:text-[#8c7f4a]"
            required
          />
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#C6B96F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A1B556]/50 text-[#4e4725] bg-white/70 placeholder:text-[#8c7f4a]"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#C6B96F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A1B556]/50 text-[#4e4725] bg-white/70 placeholder:text-[#8c7f4a]"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border-2 border-[#C6B96F] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A1B556]/50 text-[#4e4725] pr-12 bg-white/70 placeholder:text-[#8c7f4a]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a7041] hover:text-[#5f562e] bg-transparent border-none outline-none focus:outline-none p-0"
            >
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#8BA04B] to-[#73893F] text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition text-base font-semibold disabled:opacity-60 active:scale-95"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-[#4e4725]">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#8BA04B] font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
