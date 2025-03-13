import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(""); // User input value
  const [search, setSearch] = useState(""); // Actual search trigger when clicking search button
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 6;

  // ✅ Fetch products from backend using Axios
  useEffect(() => {
    const url = `http://localhost:5000/products?search=${search}&page=${currentPage}&limit=${productsPerPage}`;
    console.log("Requesting URL: ", url); // Debugging URL

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products: ", err)); // Error handling
  }, [search, currentPage]); // Dependencies (search & page)

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-16">
        {/* ✅ Search Bar with Button */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 w-full rounded-l"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update input value
          />
          <button
            onClick={() => {
              setSearch(query); // Trigger search when button is clicked
              setCurrentPage(1); // Reset to page 1 when new search starts
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* ✅ Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-600">No products found.</p>
          )}
        </div>

        {/* ✅ Pagination Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-500 text-white"
            }`}
          >
            Previous
          </button>
          <span className="flex items-center">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Next
          </button>
        </div>

        {/* ✅ Modal for Product Details */}
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
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
              <p className="text-lg mb-1">Price: ${selectedProduct.price}</p>
              <p className="text-md text-gray-600 mb-1">Category: {selectedProduct.category}</p>
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
