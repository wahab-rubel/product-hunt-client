import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebase.init"; 
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"; // 👍 Like Icon

const ProductCard = ({ product }) => {
  const { currentUser } = UNSAFE_createClientRoutesWithHMRRevalidationOptOut(); 
  const [upvotes, setUpvotes] = useState(product.upvotes?.length || 0);
  const [hasVoted, setHasVoted] = useState(currentUser ? product.upvotes?.includes(currentUser.uid) : false);

  const handleUpvote = async () => {
    if (!currentUser) {
      window.location.href = "/login"; 
      return;
    }

    const productRef = doc(db, "products", product.id);

    if (hasVoted) {
      await updateDoc(productRef, {
        upvotes: arrayRemove(currentUser.uid),
      });
      setUpvotes(upvotes - 1);
    } else {
      await updateDoc(productRef, {
        upvotes: arrayUnion(currentUser.uid),
      });
      setUpvotes(upvotes + 1);
    }

    setHasVoted(!hasVoted);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 
        className="text-lg font-bold cursor-pointer hover:underline"
        onClick={() => window.location.href = `/product/${product.id}`} 
      >
        {product.name}
      </h3>
      <p className="text-gray-500 text-sm">{product.tags.join(", ")}</p>
      <button
        className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-lg ${hasVoted ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={handleUpvote}
        disabled={product.ownerId === currentUser?.uid} 
      >
        {hasVoted ? <FaThumbsUp /> : <FaRegThumbsUp />} {upvotes}
      </button>
    </div>
  );
};

export default ProductCard;
