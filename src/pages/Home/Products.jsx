import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import NavBar from "../../components/Navbar";
import axios from "axios";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [products, setProducts] = useState([]); // All fetched products
  const [query, setQuery] = useState(urlSearchQuery); // Search input value (linked to input field)
  const [search, setSearch] = useState(urlSearchQuery); // Actual search trigger
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal
  const productsPerPage = 6; // Number of products per page

  // Fetch products when 'search' or 'currentPage' changes
  useEffect(() => {
    const fetchProducts = async () => {
      const url = `http://localhost:5000/products?search=${search}&page=${currentPage}&limit=${productsPerPage}`;
      console.log("Fetching URL:", url); // Debugging

      try {
        const response = await axios.get(url);
        console.log("Products fetched:", response.data);
        setProducts(response.data.products); // Adjust according to API response
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [search, currentPage]);

  // Handle Search Form Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setSearch(query.trim()); // Set search query to trigger fetch
      setCurrentPage(1); // Reset to first page on new search
      navigate(`/products?search=${query.trim()}`); // Sync URL
    }
  };

  return (
    <>
      <NavBar />

      <div className="container mx-auto p-4 mt-16">
        {/* ✅ Search Bar with Icon Button inside input */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:block relative mb-6"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white/20 placeholder-gray-300 pl-10 pr-10 py-2 rounded-full text-white w-full focus:outline-none focus:ring focus:ring-orange-400"
          />
          <button
            type="submit"
            className="absolute left-3 top-2.5 text-white opacity-70"
          >
            <FaSearch />
          </button>
        </form>

        {/* ✅ Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded"
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
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Previous
          </button>
          <span className="flex items-center font-medium">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Next
          </button>
        </div>

        {/* ✅ Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative shadow-lg">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-2 right-2 text-red-500 text-xl"
              >
                ✖
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>
              <p className="text-lg mb-1">Price: ${selectedProduct.price}</p>
              <p className="text-md text-gray-600 mb-1">
                Category: {selectedProduct.category}
              </p>
              <p className="mt-2 text-gray-700">
                {selectedProduct.description || "No Description Available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
