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
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Success notification (you can replace with toast)
        alert('Product added successfully!');
        navigate('/my-products');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add product. Please check console for errors.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <div className="mb-4">
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-48 object-cover rounded" />
          )}
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700">Owner Name</label>
          <input
            type="text"
            value={user.name}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Owner Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
