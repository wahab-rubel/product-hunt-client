import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaFlag } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth() || {};
  const navigate = useNavigate();

  // ✅ Fetch Products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`https://product-hunt-server-tawny.vercel.app/products`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Upvote API Call
  const upvoteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://product-hunt-server-tawny.vercel.app/api/products/${productId}/upvote`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.uid }),
        }
      );
      if (!response.ok)
        throw new Error(`Error upvoting: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("❌ Error upvoting:", error);
      return null;
    }
  };

  // ✅ Handle Upvote
  const handleUpvote = async (productId, ownerId, hasVoted) => {
    if (!user) return navigate("/login");
    if (user.uid === ownerId) return;
    if (hasVoted) return;

    const data = await upvoteProduct(productId);
    if (data?.success) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === productId
            ? {
                ...p,
                votes: data.updatedVotes,
                votedBy: [...(p.votedBy || []), user.uid],
              }
            : p
        )
      );
    }
  };

  // ✅ Render Products
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
        ✨ Featured <span className="text-orange-500">Products</span>
      </h2>

      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-500">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => {
              const isVoted = (product.votedBy || []).includes(user?.uid);

              return (
                <div
                  key={product._id}
                  className="relative bg-gradient-to-br from-slate-700 to-red-950 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-orange-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5 flex flex-col h-full">
                    <h3
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="text-lg font-bold text-gray-800 mb-3 cursor-pointer hover:text-orange-500 transition-colors duration-200 line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-5 line-clamp-2 italic">
                      Tags: {product.tags?.join(", ") || "No tags"}
                    </p>

                    <div className="mt-auto flex justify-between items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpvote(product._id, product.ownerId, isVoted)
                        }
                        disabled={user?.uid === product.ownerId || isVoted}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-sm transition-all duration-300 ${
                          user?.uid === product.ownerId || isVoted
                            ? "bg-orange-700 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500"
                        }`}
                      >
                        <FaArrowUp /> <span>{product.votes || 0}</span>
                      </button>

                      <button
                        title="Report Product"
                        className="flex items-center justify-center bg-red-700 hover:bg-red-200 text-red-500 rounded-full p-2 transition-colors duration-300"
                      >
                        <FaFlag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
