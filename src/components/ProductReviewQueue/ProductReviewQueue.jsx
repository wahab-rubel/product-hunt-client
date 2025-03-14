import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductReviewQueue = ({ productsData }) => {
  const [products, setProducts] = useState([]);

  // Sort products: Pending first, then others
  useEffect(() => {
    const sortedProducts = [...productsData].sort((a, b) => {
      const statusOrder = { Pending: 1, Accepted: 2, Rejected: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
    setProducts(sortedProducts);
  }, [productsData]);

  // Handle Accept Product
  const handleAccept = (productId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, status: "Accepted" } : product
      )
    );
  };

  // Handle Reject Product
  const handleReject = (productId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, status: "Rejected" } : product
      )
    );
  };

  // Handle Make Featured
  const handleMakeFeatured = (productId) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, featured: true } : product
      )
    );
  };

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
                    onClick={() => handleAccept(product.id)}
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
                    onClick={() => handleReject(product.id)}
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
