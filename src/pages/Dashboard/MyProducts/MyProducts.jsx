import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { fetchWithTimeout } from '../../../utils/fetchWithTimeout';

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading

  // ✅ Fetch user's products
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://product-hunt-server-eight-flax.vercel.app/products?userEmail=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data.products || []))
        .catch((err) => console.error("Failed to load products", err));
    }
  }, [user]);

  // ✅ Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(
        `https://product-hunt-server-eight-flax.vercel.app/products/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Product deleted successfully!");
            setProducts((prev) => prev.filter((product) => product._id !== id));
          }
        })
        .catch((err) => console.error("Delete failed", err));
    }
  };

  // ✅ Handle Approve with Loading State
  const handleApprove = (id) => {
    console.log('Attempting to approve product with ID:', id);
  
    fetchWithTimeout(`https://product-hunt-server-eight-flax.vercel.app/products/approve/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Make sure this token exists and is valid
      },
      body: JSON.stringify({ status: 'Accepted' }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Approval Response:', data);
        if (data.modifiedCount > 0) {
          toast.success('Product approved successfully!');
          setProducts((prev) =>
            prev.map((product) =>
              product._id === id ? { ...product, status: 'Accepted' } : product
            )
          );
        } else {
          toast.error('Approval failed. Try again.');
        }
      })
      .catch((error) => {
        console.error('Approval failed:', error);
        toast.error(`Approval failed. Error: ${error.message}`);
      });
  };
  


  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-center">Votes</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4 text-center">
                    {product.votes || 0}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
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
                  <td className="py-3 px-4 text-center space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row justify-center items-center">
                    {/* Update Button */}
                    <Link
                      to={`/dashboard/updateproduct/${product._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 transition text-white text-xs px-3 py-1 rounded shadow"
                    >
                      Update
                    </Link>

                    {/* Approve Button */}
                    {product.status !== "Accepted" && (
                      <button
                        onClick={() => handleApprove(product._id)}
                        className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Approve"}
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 transition text-white text-xs px-3 py-1 rounded shadow"
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
