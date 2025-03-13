import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaFlag } from "react-icons/fa";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth() || {};
  const navigate = useNavigate();

  // 🔹 Fetch products function
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🔹 API Call: Upvote a Product
  const upvoteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}/upvote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.uid }), // Ensure the user ID is sent
        }
      );

      if (!response.ok) {
        throw new Error(`Error upvoting: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error upvoting:", error);
      return null;
    }
  };

  // 🔹 Handle Upvote Function
  const handleUpvote = async (productId, ownerId, hasVoted) => {
    if (!user) {
      console.log("❌ User not logged in!");
      return navigate("/login");
    }
    if (user.uid === ownerId) {
      console.log("❌ Cannot upvote own product!");
      return;
    }
    if (hasVoted) {
      console.log("❌ User already voted!");
      return;
    }

    try {
      // Call upvoteProduct function
      const data = await upvoteProduct(productId);

      if (data?.success) {
        // Update local state with the new vote count
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === productId
              ? {
                  ...p,
                  votes: data.updatedVotes,
                  votedBy: [...p.votedBy, user.uid],
                }
              : p
          )
        );
      }
    } catch (err) {
      console.error("❌ Error upvoting:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-md"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3
                  className="text-lg font-semibold mt-2 cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Tags: {product.tags?.join(", ")}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => {
                      if (product && product._id && user) {
                        handleUpvote(
                          product._id,
                          product.ownerId,
                          product.votedBy?.includes(user?.uid)
                        );
                      } else {
                        console.log("❌ Invalid product or user state");
                      }
                    }}
                    disabled={
                      user?.uid === product.ownerId ||
                      product.votedBy?.includes(user?.uid)
                    }
                    className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
                  >
                    <FaArrowUp /> <span>{product.votes}</span>
                  </button>

                  <button className="text-red-500" title="Report Product">
                    <FaFlag />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
