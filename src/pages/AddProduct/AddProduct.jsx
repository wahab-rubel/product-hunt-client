import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [externalLinks, setExternalLinks] = useState('');
  const { user } = useContext(AuthContext); 
  


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productImage || !description) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    const productData = new FormData();
    productData.append('productName', productName);
    productData.append('productImage', productImage);
    productData.append('description', description);
    productData.append('ownerName', user.name);
    productData.append('ownerImage', user.image);
    productData.append('ownerEmail', user.email);
    productData.append('tags', JSON.stringify(tags)); // Serialize tags to store in DB
    productData.append('externalLinks', externalLinks);
    productData.append('timestamp', new Date().toISOString()); // Add current timestamp

    try {
      const response = await axios.post('/api/products', productData);
      if (response.status === 200) {
        toast.success('Product added successfully!');
        history.push('/my-products'); // Redirect to the My Products page
      }
    } catch (error) {
      console.error(error);
      toast.error('There was an error adding the product.');
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Tags</label>
          <ReactTagInput
            tags={tags}
            onChange={(newTags) => setTags(newTags)}
            placeholder="Enter tags"
          />
        </div>

        <div>
          <label className="block">External Links</label>
          <input
            type="url"
            value={externalLinks}
            onChange={(e) => setExternalLinks(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Owner Name</label>
          <input
            type="text"
            value={user.name || ''}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Owner Image</label>
          <input
            type="text"
            value={user.image || ''}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block">Owner Email</label>
          <input
            type="email"
            value={user.email || ''}
            disabled
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddProduct;
