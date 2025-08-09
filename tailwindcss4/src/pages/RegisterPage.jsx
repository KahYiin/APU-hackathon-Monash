import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "✅ User registered successfully!" });
        setFormData({ first_name: "", last_name: "", email: "", password: "" });
      } else {
        setMessage({ type: "error", text: data.error || "Registration failed" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error. Try again later." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E1C8] to-[#D6C99B] flex items-center justify-center p-6">
      <motion.div
        className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-8"
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
            className="w-full p-3 border-2 border-[#B4BD81] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#8BA04B] text-[#59602D]"
            required
          />
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#B4BD81] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#8BA04B] text-[#59602D]"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#B4BD81] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#8BA04B] text-[#59602D]"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border-2 border-[#B4BD81] rounded-lg focus:outline-none focus:ring-4 focus:ring-[#8BA04B] text-[#59602D]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#73893F] text-white rounded-lg hover:bg-[#8BA04B] shadow-md transition text-base font-semibold disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-[#59602D]">
          Already have an account?{" "}
          <a href="/login" className="text-[#8BA04B] font-semibold hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
}
