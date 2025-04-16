import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth"; // Assuming you have this hook

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    try {
      const reviewData = {
        productId: productId,
        reviewerName: user?.displayName || "Anonymous", // Use logged-in user's name or default
        reviewerImage: user?.photoURL || "", // Use logged-in user's image or default
        reviewDescription: data.comment, // Assuming your second code's textarea is for the comment
        rating: parseInt(data.rating), // Assuming you'll add a rating field
      };

      await axios.post("https://product-hunt-server-eight-flax.vercel.app/reviews", reviewData);
      toast.success("Review submitted successfully!");
      reset();
      if (onReviewSubmitted) {
        onReviewSubmitted(); // Callback to refresh reviews on the product details page
      }
    } catch (error) {
      toast.error("Failed to submit review.");
      console.error("Review submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
          Your Review
        </label>
        <textarea
          {...register("comment", { required: "Review text is required" })}
          placeholder="Write your review..."
          className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          rows="4"
          id="comment"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
          Rating
        </label>
        <select
          {...register("rating", { required: "Rating is required" })}
          className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          id="rating"
        >
          <option value="">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;