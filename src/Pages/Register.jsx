import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', photoURL: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();


  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }

    const password = formData.password;
    if (!password) {
      tempErrors.password = 'Password is required';
    } else {
      if (password.length < 8)
        tempErrors.password = 'Password must be at least 8 characters';
      else if (!/[A-Z]/.test(password))
        tempErrors.password = 'Password must include at least one uppercase letter';
      else if (!/[a-z]/.test(password))
        tempErrors.password = 'Password must include at least one lowercase letter';
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        tempErrors.password = 'Password must include at least one special character';
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoURL || null,
      });

  
      await signOut(auth);

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'Email is already registered.' });
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName}`);
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-In error: " + error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 border-1 rounded-2xl p-5 shadow">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-600' : ''}`}
            required
          />
          {errors.name && <small className="text-red-600">{errors.name}</small>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-600' : ''}`}
            required
          />
          {errors.email && <small className="text-red-600">{errors.email}</small>}
        </div>

        <div>
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="Photo URL (optional)"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-600' : ''}`}
            required
            autoComplete="new-password"
          />
          {errors.password && <small className="text-red-600">{errors.password}</small>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="bg-green-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Continue with Google
        </button>
        <div className="flex justify-center items-center mt-2">
          <small>Already have an account?</small>
          <Link to="/login" className="text-violet-600 ml-1">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
