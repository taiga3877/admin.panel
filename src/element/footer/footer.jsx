import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-t from-[#0f172a] to-[#1e293b] w-full text-white px-10 py-10 mt-auto shadow-2xl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About SneakLux</h2>
          <p className="text-gray-400 text-sm">
            SneakLux is your premium destination for exclusive sneakers,
            stylish collections, and unbeatable comfort.
          </p>
        </div>

        {/* Contact info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> Astana, Kazakhstan
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +7 (700) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@sneaklux.kz
            </li>
          </ul>
        </div>

        {/* Social links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-xl">
            <FaFacebookF className="hover:text-white text-gray-400 cursor-pointer" />
            <FaTwitter className="hover:text-white text-gray-400 cursor-pointer" />
            <FaInstagram className="hover:text-white text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} SneakLux. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
