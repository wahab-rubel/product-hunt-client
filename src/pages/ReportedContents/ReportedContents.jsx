import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);

  // ✅ Fetch reported products
  useEffect(() => {
    fetch(`https://product-hunt-server-tawny.vercel.app/reported-products`) 
      .then((res) => res.json())
      .then((data) => setReportedProducts(data))
      .catch((error) =>
        console.error("Error fetching reported products:", error)
      );
  }, []);
  
  // ✅ Handle Delete Product
  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    fetch(
      `https://product-hunt-server-tawny.vercel.app/products/${productId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Product deleted successfully!");
          // Remove product from the state/UI
          setReportedProducts((prev) =>
            prev.filter((product) => product.id !== productId)
          );
        } else {
          toast.error("Failed to delete the product!");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Reported Contents
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table w-full min-w-max">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm md:text-base">
              <th>#</th>
              <th>Product Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No reported products found.
                </td>
              </tr>
            )}

            {reportedProducts.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 text-sm md:text-base"
              >
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product.name}</td>
                <td className="space-x-2 text-center">
                  <Link
                    to={`/product-details/${product.id}`}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
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

export default ReportedContents;
