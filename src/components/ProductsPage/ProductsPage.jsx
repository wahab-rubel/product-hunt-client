import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { AuthContext } from "../../context/AuthContext";

const ProductsPage = () => {
  const { user: currentUser } = useContext(AuthContext); // ✅ Get current user

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/products");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading products...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
