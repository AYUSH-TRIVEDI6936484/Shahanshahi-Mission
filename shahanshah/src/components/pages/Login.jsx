import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
    remember: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save JWT token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Navigate user depending on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-1">Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Choose your role and enter your credentials.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Login as</label>
            <div className="flex gap-3">
              <label
                className={`px-3 py-2 rounded-lg border cursor-pointer ${
                  form.role === "user"
                    ? "bg-amber-100 border-amber-400"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  className="mr-2"
                  checked={form.role === "user"}
                  onChange={onChange}
                />
                User
              </label>
              <label
                className={`px-3 py-2 rounded-lg border cursor-pointer ${
                  form.role === "admin"
                    ? "bg-amber-100 border-amber-400"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  className="mr-2"
                  checked={form.role === "admin"}
                  onChange={onChange}
                />
                Admin
              </label>
            </div>
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

          {/* Remember me */}
          <div className="flex items-center justify-between">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={onChange}
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm text-amber-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-4 py-2"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-amber-700 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
