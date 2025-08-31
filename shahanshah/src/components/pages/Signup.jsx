import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    agree: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      setError("You must accept the Terms & Privacy Policy.");
      return;
    }

    // TODO: Replace with your real signup API
    const payload = {
      name: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role,
    };
    console.log("SIGNUP ->", payload);

    alert(`Account created as ${form.role.toUpperCase()}`);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-1">Create account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Sign up as <span className="font-semibold">User</span> or <span className="font-semibold">Admin</span>.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Register as</label>
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                onClick={() => setShowPwd((s) => !s)}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm password</label>
            <div className="relative">
              <input
                type={showCPwd ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                onClick={() => setShowCPwd((s) => !s)}
              >
                {showCPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* T&C */}
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={onChange}
            />
            I agree to the <a href="#" className="text-amber-700 hover:underline">Terms</a> & <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a>.
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-4 py-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
