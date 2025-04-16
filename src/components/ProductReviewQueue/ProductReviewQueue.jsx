import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://your-api-url.com/products"); // Replace with your actual API endpoint
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const sortedProducts = [...data].sort((a, b) => {
          const statusOrder = { Pending: 1, Accepted: 2, Rejected: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setProducts(sortedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateStatus = async (productId, status) => {
    try {
      const res = await fetch(`https://your-api-url.com/products/${productId}/status`, { // Replace with your actual API endpoint
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const updatedProduct = await res.json();
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, status: updatedProduct.status } : product
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMakeFeatured = async (productId) => {
    try {
      const res = await fetch(`https://your-api-url.com/products/${productId}/feature`, { // Replace with your actual API endpoint
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const updatedProduct = await res.json();
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, featured: updatedProduct.featured } : product
        )
      );
      alert("Product marked as featured!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="p-6 max-w-6xl mx-auto">Loading products...</div>;
  }

  if (error) {
    return <div className="p-6 max-w-6xl mx-auto text-red-500">Error loading products: {error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Review Queue</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3">Product Name</th>
              <th className="p-3">View Details</th>
              <th className="p-3">Make Featured</th>
              <th className="p-3">Accept</th>
              <th className="p-3">Reject</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.name}</td>
                <td className="p-3">
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleMakeFeatured(product.id)}
                    disabled={product.featured}
                    className={`px-3 py-1 rounded ${
                      product.featured
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {product.featured ? "Featured" : "Make Featured"}
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdateStatus(product.id, "Accepted")}
                    disabled={product.status === "Accepted"}
                    className={`px-3 py-1 rounded ${
                      product.status === "Accepted"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    Accept
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdateStatus(product.id, "Rejected")}
                    disabled={product.status === "Rejected"}
                    className={`px-3 py-1 rounded ${
                      product.status === "Rejected"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Reject
                  </button>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : product.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReviewQueue;