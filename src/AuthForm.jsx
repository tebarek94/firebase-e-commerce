import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

export default function AuthForm() {
  const { signup, login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login or create your account</p>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="primary"
          onClick={() => login(form.email, form.password)}
        >
          Login
        </button>

        <button
          className="secondary"
          onClick={() => signup(form.email, form.password)}
        >
          Sign Up
        </button>

        <div className="divider">OR</div>

        <button className="google" onClick={loginWithGoogle}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
          />
          Continue with Google
        </button>
      </div>

      {/* STYLES */}
      <style>{`
        * { box-sizing: border-box; }
        body { background: #f4f6fb; font-family: Inter, sans-serif; }

        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .auth-card {
          width: 100%;
          max-width: 380px;
          background: #fff;
          padding: 32px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          text-align: center;
        }

        .auth-card h2 {
          margin-bottom: 6px;
          font-size: 24px;
        }

        .subtitle {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 24px;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 14px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #2563eb;
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          cursor: pointer;
          margin-top: 8px;
        }

        .primary {
          background: #2563eb;
          color: #fff;
        }

        .secondary {
          background: #eef2ff;
          color: #2563eb;
        }

        .divider {
          margin: 18px 0;
          font-size: 12px;
          color: #9ca3af;
        }

        .google {
          background: #fff;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .google img {
          width: 18px;
        }
      `}</style>
    </div>
  );
}
