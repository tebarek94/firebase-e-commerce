import { useState } from "react";
import "../styles/auth.css";
import { app } from "../config/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function AuthForm() {
  const [data, setData] = useState({ email: "", password: "" });
  const auth = getAuth(app);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("Signup successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const socialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login or create your account</p>

        <form>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={data.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />

          <button className="primary" onClick={handleSignIn}>
            Login
          </button>

          <button className="secondary" onClick={handleSignUp}>
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            className="social google"
            onClick={() => socialLogin(new GoogleAuthProvider())}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <button
            type="button"
            className="social github"
            onClick={() => socialLogin(new GithubAuthProvider())}
          >
            <img
              src="https://www.svgrepo.com/show/217753/github-icon-logo.svg"
              alt="GitHub"
            />
            Continue with GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
