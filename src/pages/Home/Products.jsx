import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import NavBar from "../../components/Navbar";
import axios from "axios";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search")?.toLowerCase() || "";

  // ✅ State Variables
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(urlSearchQuery);
  const [search, setSearch] = useState(urlSearchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 6;

  // ✅ Fetch products on search or pagination change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `http://localhost:5000/products?search=${search}&page=${currentPage}&limit=${productsPerPage}`;
        console.log("Fetching URL:", url); // Debug purpose

        const response = await axios.get(url);
        console.log("Fetched Products:", response.data); // Debug purpose

        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [search, currentPage]);

  // ✅ Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery !== "") {
      setSearch(trimmedQuery);
      setCurrentPage(1);
      navigate(`/products?search=${trimmedQuery}`);
    }
  };

  // ✅ Pagination Controls
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      <NavBar />

      <div className="container mx-auto p-4 mt-20">
        {/* ✅ Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative mb-6 w-full max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white/20 placeholder-gray-300 pl-10 pr-10 py-3 rounded-full text-white w-full focus:outline-none focus:ring focus:ring-orange-400"
          />
          <button
            type="submit"
            className="absolute left-4 top-3 text-white opacity-70"
          >
            <FaSearch />
          </button>
        </form>

        {/* ✅ Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover mb-2 rounded"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-500">Category: {product.category}</p>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600 w-full"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-600">
              No products found for "{search}"
            </p>
          )}
        </div>

        {/* ✅ Pagination */}
        {products.length > 0 && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              Previous
            </button>
            <span className="flex items-center font-semibold text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* ✅ Modal for Product Details */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative shadow-xl">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-2 right-2 text-red-500 text-2xl"
              >
                &times;
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-52 object-cover mb-4 rounded"
              />
              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-lg mb-1">Price: ${selectedProduct.price}</p>
              <p className="text-md text-gray-600 mb-2">
                Category: {selectedProduct.category}
              </p>
              <p className="text-gray-700">
                {selectedProduct.description || "No Description Available."}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
