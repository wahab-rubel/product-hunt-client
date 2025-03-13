const Footer = () => {
 return (
   <footer className="bg-gray-900 text-white py-10">
     <div className="container mx-auto px-6 lg:px-20">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Logo + Description */}
         <div>
           <h2 className="text-2xl font-bold">YourBrand</h2>
           <p className="text-gray-400 mt-2">
             Discover, share, and grow with the best products in the world.
           </p>
         </div>

         {/* Navigation Links */}
         <div className="flex justify-between">
           <div>
             <h3 className="text-lg font-semibold mb-3">Company</h3>
             <ul className="space-y-2">
               <li><a href="#" className="hover:text-gray-300">About</a></li>
               <li><a href="#" className="hover:text-gray-300">Blog</a></li>
               <li><a href="#" className="hover:text-gray-300">Careers</a></li>
               <li><a href="#" className="hover:text-gray-300">Contact</a></li>
             </ul>
           </div>
           <div>
             <h3 className="text-lg font-semibold mb-3">Support</h3>
             <ul className="space-y-2">
               <li><a href="#" className="hover:text-gray-300">Help Center</a></li>
               <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
             </ul>
           </div>
         </div>

         {/* Social Links */}
         <div>
           <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
           <div className="flex space-x-4">
             <a href="#" className="hover:text-gray-300">
               <i className="fab fa-twitter text-2xl"></i>
             </a>
             <a href="#" className="hover:text-gray-300">
               <i className="fab fa-facebook text-2xl"></i>
             </a>
             <a href="#" className="hover:text-gray-300">
               <i className="fab fa-linkedin text-2xl"></i>
             </a>
           </div>
         </div>
       </div>

       {/* Copyright Section */}
       <div className="mt-8 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
         &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
       </div>
     </div>
   </footer>
 );
};

export default Footer;
