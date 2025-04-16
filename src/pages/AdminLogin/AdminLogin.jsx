import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!adminEmail || !adminPassword) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in both fields!",
      });
      return;
    }

    try {
      const result = await signIn(adminEmail, adminPassword);
      const user = result.user;

      // Admin email check (optional validation)
      const adminAllowed = user.email === "admin@example.com";

      if (adminAllowed) {
        Swal.fire({
          icon: "success",
          title: "Welcome Admin!",
        });
        navigate("/admin/dashboard"); // or whatever admin route you have
      } else {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You are not an admin!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <input
        type="email"
        placeholder="Admin Email"
        value={adminEmail}
        onChange={(e) => setAdminEmail(e.target.value)}
        className="border p-2 block mb-4 w-full rounded"
      />
      <input
        type="password"
        placeholder="Admin Password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        className="border p-2 block mb-4 w-full rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
