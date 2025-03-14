import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle tag deletion
  const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));

  // Handle tag addition
  const handleAddition = (tag) => setTags([...tags, tag]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert('Please upload an image!');

    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('ownerName', user.name);
    formData.append('ownerEmail', user.email);
    formData.append('tags', JSON.stringify(tags.map(tag => tag.text)));
    formData.append('externalLink', externalLink);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        alert('🎉 Product added successfully!');
        navigate('/my-products');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="bg-white backdrop-blur-lg bg-opacity-30 shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">🚀 Add New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter product name"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 w-full h-60 object-cover rounded-lg shadow-md" />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter product description"
            />
          </div>

          {/* Owner Info */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Owner Name</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">Owner Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tags</label>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              inputFieldPosition="bottom"
              autocomplete
              placeholder="Add tags (e.g., technology, innovation)"
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">External Link (Optional)</label>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="https://example.com"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading} // Disable while loading
            className={`w-full py-3 rounded-lg font-bold text-lg shadow-md transition-transform transform ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:scale-105'
            }`}
          >
            {isLoading ? '⏳ Submitting...' : '🚀 Submit Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
