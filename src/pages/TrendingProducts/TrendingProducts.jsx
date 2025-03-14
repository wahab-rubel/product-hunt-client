import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 

  
  useEffect(() => {
    axios
      .get("https://your-api-url.com/products") 
      .then((res) => {
        const sortedProducts = res.data
          .filter((product) => product.isFeatured) 
          .sort((a, b) => b.upvotes - a.upvotes) 
          .slice(0, 6); 
        setProducts(sortedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // 🔥 Upvote
  const handleUpvote = async (id, ownerId) => {
    if (!user) {
      return navigate("/login"); 
    }

    if (user.uid === ownerId) {
      return alert("You can't upvote your own product!"); 
    }

    try {
      await axios.post(`https://product-hunt-server-tawny.vercel.app/products/upvote/${id}`, {
        userId: user.uid,
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? { ...product, upvotes: product.upvotes + 1 }
            : product
        )
      );
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        🔥 Trending Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow-md p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3
              className="text-lg font-semibold my-2 cursor-pointer text-blue-600"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">{product.tags.join(", ")}</p>
            <button
              onClick={() => handleUpvote(product._id, product.ownerId)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 mt-3 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              disabled={user?.uid === product.ownerId}
            >
              <FaArrowUp />
              {product.upvotes}
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 Show All Products Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/products")}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Show All Products
        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
