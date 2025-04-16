import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProductForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = data.productImage[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    const imageUploadURL = `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`; // Replace with your actual ImgBB API key

    try {
      const imageUploadResponse = await fetch(imageUploadURL, {
        method: 'POST',
        body: formData,
      });
      const imageData = await imageUploadResponse.json();

      if (imageData.success) {
        const productData = {
          productName: data.productName,
          description: data.description,
          tags: data.tags.split(',').map((tag) => tag.trim()),
          externalLinks: data.externalLinks,
          ownerName: user?.displayName || data.ownerName, // Use logged-in user's name if available
          ownerImage: user?.photoURL || data.ownerImage, // Use logged-in user's photo if available
          ownerEmail: user?.email || data.ownerEmail, // Use logged-in user's email if available
          productImage: imageData.data.url,
          timestamp: new Date(),
          status: 'Pending', // Initial status
          votes: { up: 0, down: 0 },
          bookmarkedBy: [],
          reportedBy: [],
          reviews: [],
        };

        const response = await fetch('https://product-hunt-server-eight-flax.vercel.app/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your auth token if required
          },
          body: JSON.stringify(productData),
        });

        const responseData = await response.json();

        if (response.ok) {
          toast.success('Product added successfully!');
          reset();
          navigate('/dashboard/my-products');
        } else {
          toast.error(`Failed to add product: ${responseData.message || 'Something went wrong'}`);
        }
      } else {
        toast.error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            {...register('productName', { required: 'Product name is required' })}
            placeholder="Enter product name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            placeholder="Enter product description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            {...register('tags')}
            placeholder="e.g., AI, Web App, Productivity"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="externalLinks" className="block text-gray-700 text-sm font-bold mb-2">
            External Link (Website/Landing Page)
          </label>
          <input
            type="url"
            id="externalLinks"
            {...register('externalLinks')}
            placeholder="Enter website or landing page URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="ownerName" className="block text-gray-700 text-sm font-bold mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="ownerName"
            {...register('ownerName', { required: 'Your name is required' })}
            placeholder={user?.displayName || "Enter your name"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly={user?.displayName}
          />
        </div>
        <div>
          <label htmlFor="ownerImage" className="block text-gray-700 text-sm font-bold mb-2">
            Your Image URL
          </label>
          <input
            type="url"
            id="ownerImage"
            {...register('ownerImage', { required: 'Your image URL is required' })}
            placeholder={user?.photoURL || "Enter your image URL"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly={user?.photoURL}
          />
        </div>
        <div>
          <label htmlFor="ownerEmail" className="block text-gray-700 text-sm font-bold mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="ownerEmail"
            {...register('ownerEmail', { required: 'Your email is required' })}
            placeholder={user?.email || "Enter your email"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly={user?.email}
          />
        </div>
        <div>
          <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            {...register('productImage', { required: 'Product image is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;