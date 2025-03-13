import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const UpdateProduct = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();

  // State variables
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Base URL for your backend
  const BASE_URL = 'http://localhost:5000/products';

  // ✅ Fetch existing product data on component mount
  useEffect(() => {
    console.log('Product ID:', id); // Debugging purpose

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`); // Corrected URL
        console.log('Fetched Data:', data); // Debugging purpose

        // Populate form fields with fetched data
        setProductName(data.productName);
        setDescription(data.description);
        setTags(data.tags.map(tag => ({ id: tag, text: tag }))); // Convert tags to format required by ReactTags
        setExternalLink(data.externalLink || '');
        setImagePreview(data.imageUrl); // Preview existing image
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product data. Please check if product ID is correct.');
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set image preview
  };

  // ✅ Handle tag addition
  const handleAddition = (tag) => setTags([...tags, tag]);

  // ✅ Handle tag deletion
  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('ownerName', user.name);
    formData.append('ownerEmail', user.email);
    formData.append('tags', JSON.stringify(tags.map(tag => tag.text))); // Send only tag texts
    formData.append('externalLink', externalLink);
    if (image) formData.append('image', image); // Append image only if new one selected

    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('✅ Product updated successfully!');
        navigate('/dashboard/myproducts');
      } else {
        alert('❌ Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('❌ Failed to update product. See console for details.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block text-gray-700">Product Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-48 object-cover rounded" />
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter product description"
          />
        </div>

        {/* Owner Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Owner Name</label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* Owner Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Owner Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700">Tags</label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Add new tag"
          />
        </div>

        {/* External Link */}
        <div className="mb-4">
          <label className="block text-gray-700">External Link</label>
          <input
            type="url"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Optional external link"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
