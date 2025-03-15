import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imageFile, setImageFile] = useState(null);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data); // Set old product data
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product data.');
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store file
    setProduct((prev) => ({ ...prev, image: e.target.files[0].name })); // Optional: update for preview
  };

  // Handle update
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (imageFile) formData.append('image', imageFile); // Only append if a new image selected

    try {
      const response = await axios.patch(`https://product-hunt-server-eight-flax.vercel.app/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Product updated:', response.data);
      alert('Product Updated Successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={product.title || ''}
        onChange={handleChange}
        placeholder="Product Title"
        className="w-full p-2 border mb-3 rounded"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        value={product.price || ''}
        onChange={handleChange}
        placeholder="Product Price"
        className="w-full p-2 border mb-3 rounded"
      />

      {/* Description */}
      <textarea
        name="description"
        value={product.description || ''}
        onChange={handleChange}
        placeholder="Product Description"
        className="w-full p-2 border mb-3 rounded"
      />

      {/* Image */}
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="w-full p-2 border mb-3 rounded"
      />

      {/* Preview Old or Selected Image */}
      {product.image && (
        <img
          src={imageFile ? URL.createObjectURL(imageFile) : `https://product-hunt-server-n68wm3en9-wahab-rubels-projects.vercel.app/uploads/${product.image}`}
          alt="Product"
          className="w-32 h-32 object-cover mb-3"
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Product
      </button>
    </div>
  );
};

export default ProductEdit;
