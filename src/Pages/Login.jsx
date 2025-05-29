import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.config";

const provider = new GoogleAuthProvider();

const Login = ({ setUser, user }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      setUser({
        email: loggedInUser.email,
        name: loggedInUser.displayName || loggedInUser.email.split("@")[0],
      });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser({
        email: loggedInUser.email,
        name: loggedInUser.displayName || loggedInUser.email.split("@")[0],
      });
      toast.success("Google login successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔒 If user already logged in, return null or loading spinner
  if (user) {
    return null; // or <div>Redirecting...</div> if you want a message
  }

  return (
    <div className="max-w-sm mx-auto mt-10 border rounded-2xl p-5 shadow">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={handleGoogleLogin}
          className="bg-green-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>

        <div className="flex justify-center items-center mt-2">
          <small>Don’t Have Account?</small>
          <Link to="/register" className="text-violet-600 ml-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
