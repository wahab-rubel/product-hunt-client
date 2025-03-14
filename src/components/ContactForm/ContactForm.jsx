import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // 🔗 You can replace console.log with actual API integration
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl mt-24 mb-16">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">
        Contact <span className="text-yellow-500">Us</span>
      </h2>
      <p className="text-center text-gray-600 mb-8 text-lg">
        We'd love to hear from you! Whether you have a question about a product, pricing, or anything else — our team is ready to answer all your questions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500 text-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500 text-lg"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Your Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Write your message here..."
            className="w-full p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500 text-lg resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-3 bg-purple-700 text-white font-bold text-lg py-4 rounded-2xl hover:bg-purple-800 transition-all duration-300 shadow-lg"
        >
          <FaPaperPlane className="text-xl" />
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
