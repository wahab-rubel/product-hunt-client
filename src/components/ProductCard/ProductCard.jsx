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

  if (!product) return null;

  const [bookmarked, setBookmarked] = useState(
    product?.bookmarkedBy?.includes(currentUser?.email) || false
  );

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ id, type }) => {
      const res = await axios.patch(
        `http://localhost:5000/products/${id}/vote`,
        { type, userEmail: currentUser?.email }
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  // Bookmark mutation
  const bookmarkMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.post(
        `http://localhost:5000/products/${id}/bookmark`,
        { userEmail: currentUser?.email }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setBookmarked((prev) => !prev);
    },
  });

  const handleVote = (type) => {
    if (!currentUser) return (window.location.href = "/login");
    voteMutation.mutate({ id: product._id, type });
  };

  const handleBookmark = () => {
    if (!currentUser) return (window.location.href = "/login");
    bookmarkMutation.mutate(product._id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-4 rounded-xl shadow-lg transition-all"
    >
      <img
        src={
          product.productImage?.startsWith("data:image")
            ? product.productImage
            : `data:image/png;base64,${product.productImage}`
        }
        alt={product.productName}
        className="w-full h-40 object-cover rounded-md"
        onClick={() => (window.location.href = `/product/${product._id}`)}
      />

      <h3
        className="text-lg font-bold mt-2 cursor-pointer hover:underline"
        onClick={() => (window.location.href = `/product/${product._id}`)}
      >
        {product.productName}
      </h3>

      <p className="text-gray-600 text-sm mt-1">
        {product.description?.slice(0, 100) + "..."}
      </p>

      <p className="text-gray-500 text-xs mt-1">
        Tags: {Array.isArray(product.tags) ? product.tags.join(", ") : "None"}
      </p>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handleVote("up")}
          className="flex items-center gap-1 text-green-600 hover:text-green-800"
        >
          <FaThumbsUp /> {product.votes?.up || 0}
        </button>

        <button
          onClick={() => handleVote("down")}
          className="flex items-center gap-1 text-red-600 hover:text-red-800"
        >
          <FaThumbsDown /> {product.votes?.down || 0}
        </button>

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
