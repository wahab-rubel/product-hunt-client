import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useProduct from "../../hooks/useProduct";
import ReviewForm from "./ReviewForm";
import ReviewCard from "../../components/ReviewCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { product, upvoteProduct, reportProduct } = useProduct(id);
  const [reviews, setReviews] = useState([]);

  
  useEffect(() => {
    fetch(`hhttps://product-hunt-server-eight-flax.vercel.app/products/reviews?productId=${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow">
        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        <h2 className="text-3xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex items-center mt-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{product.tags}</span>
        </div>
        <p className="mt-3">
          <a href={product.externalLink} className="text-blue-600 hover:underline">
            More Details
          </a>
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => upvoteProduct(id)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Upvote ({product.upvoteCount})
          </button>
          <button
            onClick={() => reportProduct(id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Report
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <h3 className="text-2xl font-bold mt-8">Reviews</h3>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-3">No reviews yet.</p>
      )}

      {/* Review Form */}
      {user && <ReviewForm productId={id} />}
    </div>
  );
};

export default ProductDetails;
