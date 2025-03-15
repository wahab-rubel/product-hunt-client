import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);

  // Fetch posted products from API or local data
  useEffect(() => {
    fetch(`https://product-hunt-server-tawny.vercel.appproducts`) // ✅ Replace this with your actual API
      .then((res) => res.json())
      .then((data) => {
        // Sort products: Pending status first
        const sortedProducts = data.sort((a, b) => {
          if (a.status === "Pending" && b.status !== "Pending") return -1;
          if (a.status !== "Pending" && b.status === "Pending") return 1;
          return 0;
        });
        setProducts(sortedProducts);
      });
  }, []);

  // ✅ Handle Make Featured
  const handleMakeFeatured = (productId) => {
    // API call to mark as featured
    fetch(`https://product-hunt-server-tawny.vercel.appproducts/featured/${productId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Product marked as featured!");
      });
  };

  // ✅ Handle Accept Product
  const handleAccept = (productId) => {
    fetch(`https://product-hunt-server-tawny.vercel.appproducts/accept/${productId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Product accepted!");
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? { ...product, status: "Accepted" }
              : product
          )
        );
      });
  };

  // ✅ Handle Reject Product
  const handleReject = (productId) => {
    fetch(`https://product-hunt-server-tawny.vercel.appproducts/reject/${productId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        toast.error("Product rejected!");
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? { ...product, status: "Rejected" }
              : product
          )
        );
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Review Queue</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}

            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded ${
                      product.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : product.status === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {/* View Details Button */}
                  <Link
                    to={`/product-details/${product.id}`}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    View Details
                  </Link>

                  {/* Make Featured */}
                  <button
                    onClick={() => handleMakeFeatured(product.id)}
                    className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Make Featured
                  </button>

                  {/* Accept Button */}
                  <button
                    onClick={() => handleAccept(product.id)}
                    className={`btn btn-sm ${
                      product.status === "Accepted" ||
                      product.status === "Rejected"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    disabled={
                      product.status === "Accepted" ||
                      product.status === "Rejected"
                    }
                  >
                    Accept
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => handleReject(product.id)}
                    className={`btn btn-sm ${
                      product.status === "Accepted" ||
                      product.status === "Rejected"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                    disabled={
                      product.status === "Accepted" ||
                      product.status === "Rejected"
                    }
                  >
                    Reject
                  </button>
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
