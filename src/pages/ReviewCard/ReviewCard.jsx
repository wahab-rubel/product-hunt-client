const ReviewCard = ({ review }) => {
 return (
   <div className="bg-white p-4 rounded-lg shadow">
     <div className="flex items-center gap-2">
       <img src={review.reviewerImage} alt="User" className="w-10 h-10 rounded-full" />
       <h4 className="font-bold">{review.reviewerName}</h4>
     </div>
     <p className="text-gray-700 mt-2">{review.review}</p>
     <p className="text-yellow-500">⭐ {review.rating}/5</p>
   </div>
 );
};

export default ReviewCard;
