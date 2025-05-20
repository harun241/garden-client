import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../firebase.config";
import { Link } from "react-router-dom";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const { email, password } = form;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Google login successful!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
        Login
      </h2>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>

      <div className="my-6 flex items-center justify-center">
        <hr className="w-full border-t border-gray-300" />
        <span className="px-3 text-gray-500">or</span>
        <hr className="w-full border-t border-gray-300" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Sign in with Google
      </button>

      <p className="text-center text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-green-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
