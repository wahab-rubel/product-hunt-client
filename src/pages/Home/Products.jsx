import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import NavBar from "../../components/Navbar";
import axios from "axios";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(urlSearchQuery);
  const [search, setSearch] = useState(urlSearchQuery);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 6;

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `https://product-hunt-server-tawny.vercel.app/products?search=${search}&page=${currentPage}&limit=${productsPerPage}`;
        const response = await axios.get(url);
        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
    navigate(`/products?search=${search}&page=${currentPage}`, {
      replace: true,
    });
  }, [search, currentPage, navigate]);

  // ✅ Search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery !== "") {
      setSearch(trimmedQuery);
      setCurrentPage(1);
    }
  };

  // ✅ Pagination controls
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  // ✅ Slider controls
  const handlePrevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  const handleNextSlide = () =>
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));

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

        {/* ✅ Product Slider */}
        {products.length > 0 && (
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden mb-10">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-full p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-700">Price: ${product.price}</p>
                  <p className="text-gray-500">Category: {product.category}</p>
                </div>
              ))}
            </div>

            {/* ✅ Prev/Next Slider */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-xl">
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
