import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/image.png";
import {
  FaBox,
  FaTags,
  FaPercent,
  FaExpandArrowsAlt,
  FaPalette,
  FaQuestionCircle,
  FaPhoneAlt,
  FaUsers,
  FaNewspaper,
} from "react-icons/fa";

const menuItems = [
  { to: "/", label: "Product", icon: <FaBox /> },
  { to: "/category", label: "Category", icon: <FaTags /> },
  { to: "/discount", label: "Discount", icon: <FaPercent /> },
  { to: "/sizes", label: "Sizes", icon: <FaExpandArrowsAlt /> },
  { to: "/colors", label: "Colors", icon: <FaPalette /> },
  { to: "/faq", label: "Faq", icon: <FaQuestionCircle /> },
  { to: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
  { to: "/team", label: "Team", icon: <FaUsers /> },
  { to: "/news", label: "News", icon: <FaNewspaper /> },
];

const Header = () => {

  const navigate = useNavigate()

  const LogOut = () => {
      localStorage.clear('token');
      navigate('/')
  }
  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] w-[270px] min-h-screen p-8 flex flex-col items-center shadow-2xl backdrop-blur-lg"
    >
      <Link to={'/'}>
      <img
        src={logo}
        alt="Logo"
        className="w-[100px] mb-12    shadow-lg"
      />
      </Link>

      <ul className="flex flex-col w-full space-y-4">
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
            </NavLink>
          </motion.li>
        ))}
           <button
            onClick={() => {
             LogOut()
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 transition-all rounded-xl text-white shadow-md"
          >
           LogOut
          </button>
      </ul>
    </motion.div>
  );
};

export default Header;
