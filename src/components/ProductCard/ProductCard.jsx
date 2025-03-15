import { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";

const ProductCard = ({ product, currentUser }) => {
  const queryClient = useQueryClient();

  // Local state for bookmark (optional to control instantly)
  const [bookmarked, setBookmarked] = useState(
    product?.bookmarkedBy?.includes(currentUser?.email) || false
  );

  // ---------------------- 🧡 Vote Mutation ---------------------- //
  const voteMutation = useMutation(
    async ({ id, type }) => {
      const response = await axios.patch(
        `https://product-hunt-server-eight-flax.vercel.app/products/${id}/vote`,
        {
          type,
          userEmail: currentUser?.email, // Dynamic user email
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]); // Refresh product list
      },
      onError: (error) => {
        console.error("Vote error:", error);
      },
    }
  );

  // ---------------------- 💛 Bookmark Mutation ---------------------- //
  const bookmarkMutation = useMutation(
    async (id) => {
      const response = await axios.post(
        `https://product-hunt-server-eight-flax.vercel.app/products/${id}/bookmark`,
        {
          userEmail: currentUser?.email,
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]); // Refresh product list
        setBookmarked(!bookmarked); // Toggle bookmark state
      },
      onError: (error) => {
        console.error("Bookmark error:", error);
      },
    }
  );

  // ---------------------- 🛑 Handle Unauthorized Access ---------------------- //
  const handleVote = (type) => {
    if (!currentUser) {
      window.location.href = "/login"; // Redirect to login if not logged in
      return;
    }
    voteMutation.mutate({ id: product._id, type });
  };

  const handleBookmark = () => {
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    bookmarkMutation.mutate(product._id);
  };

  // ---------------------- ✅ Render ---------------------- //
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-4 rounded-xl shadow-lg relative transition-all"
    >
      <img
        src={`data:image/png;base64,${product.productImage}`} // Assuming base64 image
        alt={product.productName}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3
        className="text-lg font-bold mt-2 cursor-pointer hover:underline"
        onClick={() => (window.location.href = `/product/${product._id}`)} // Redirect to details
      >
        {product.productName}
      </h3>
      <p className="text-gray-600 text-sm mt-1">
        {product.description?.slice(0, 100)}...
      </p>
      <p className="text-gray-500 text-xs mt-1">
        Tags: {product.tags?.join(", ")}
      </p>
      <div className="flex items-center justify-between mt-4">
        {/* Upvote Button */}
        <button
          onClick={() => handleVote("up")}
          className="flex items-center gap-1 text-green-600 hover:text-green-800"
        >
          <FaThumbsUp /> {product.votes?.up || 0}
        </button>

        {/* Downvote Button */}
        <button
          onClick={() => handleVote("down")}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <FaThumbsDown /> {product.votes?.down || 0}
        </button>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="text-yellow-500 hover:text-yellow-600"
        >
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
