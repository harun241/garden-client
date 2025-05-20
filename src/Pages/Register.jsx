import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      alert('Registration successful!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Google Sign-In successful. Welcome ${user.displayName}`);
    } catch (error) {
      alert('Google Sign-In error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">Create Your Account</h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Photo URL (Optional)</label>
          <input
            type="text"
            name="photoURL"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center">
        <hr className="w-full border-t border-gray-300" />
        <span className="px-3 text-gray-500">or</span>
        <hr className="w-full border-t border-gray-300" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
      >
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-green-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
