import { useState } from "react";

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: "", newPassword: "", role: "user" });
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Password reset failed");
        return;
      }

      setMessage("Password updated successfully. You can now log in.");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-1">Reset Password</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email, choose your role, and set a new password.
        </p>

        {message && (
          <div className="mb-4 rounded-lg bg-blue-100 text-blue-700 px-3 py-2 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Reset as</label>
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

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />

          {/* New Password */}
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={onChange}
            placeholder="New Password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-4 py-2"
          >
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
}
