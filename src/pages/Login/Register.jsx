import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../../firebase/firebase.init";

const Register = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    // Password validation
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("Password must be at least 6 characters long and include uppercase & lowercase letters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with name and photoURL
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/YbY9K6z/default-avatar.png", // Default image
      });

      toast.success("Registration successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL (Optional)"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
