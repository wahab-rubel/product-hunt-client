import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-16">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              ProductHunt
            </h2>
            <p className="text-gray-400 mt-3 leading-relaxed">
              Discover, share, and grow with trending products. We bring the future to your fingertips.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 transition-colors p-2 rounded-lg">
                Subscribe
              </button>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
          &copy; {new Date().getFullYear()} ProductHunt. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
