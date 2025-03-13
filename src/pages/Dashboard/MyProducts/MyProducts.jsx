import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const MyProducts = () => {
  const { user } = useAuth(); // Get current logged-in user
  const [products, setProducts] = useState([]);

  // ✅ Fetch user's products when page loads
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/products?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Failed to load products", err));
    }
  }, [user]);
  

  // ✅ Handle Delete Product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Product deleted successfully");
            // Update product list after delete
            setProducts(products.filter((product) => product._id !== id));
          }
        })
        .catch((err) => console.error("Delete failed", err));
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">My Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 border-b">Product Name</th>
                <th className="py-3 px-6 border-b">Votes</th>
                <th className="py-3 px-6 border-b">Status</th>
                <th className="py-3 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="py-3 px-6 border-b">{product.name}</td>
                  <td className="py-3 px-6 border-b">{product.votes || 0}</td>
                  <td className="py-3 px-6 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        product.status === "Accepted"
                          ? "bg-green-500"
                          : product.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {product.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-6 border-b space-x-2">
                    {/* ✅ Update Button */}
                    <Link
                      to={`/dashboard/updateproduct/${product._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Update
                    </Link>
                    {/* ✅ Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
