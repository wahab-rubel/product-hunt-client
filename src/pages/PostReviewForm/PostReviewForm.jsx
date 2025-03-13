import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ReviewForm = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      productId,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      review,
      rating,
    };

    const res = await fetch("https://your-api.com/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (res.ok) {
      alert("Review submitted!");
      setReview("");
      setRating(5);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
      <input type="text" value={user.displayName} readOnly className="w-full p-2 mb-2 border rounded" />
      <input type="text" value={user.photoURL} readOnly className="w-full p-2 mb-2 border rounded" />
      <textarea
        placeholder="Your review"
        className="w-full p-2 mb-2 border rounded"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
