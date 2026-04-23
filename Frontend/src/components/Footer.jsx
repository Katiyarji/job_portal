import React from "react";
import {
  FaLinkedin,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10 ">
      <div className="flex justify-between container mx-auto px-4 text-center">
        <div className="flex flex-col text-left">
          <h2 className="text-2xl font-bold mb-2">Job Hunt 🔍</h2>
          <p className="text-gray-400 text-sm mb-4">
            Empowering your next career move. &copy; {new Date().getFullYear()} Job Hunt.
          </p>  
        </div>

        <div className="flex justify-center gap-6 text-xl  hover:text-white transition-all duration-300">
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FaFacebookSquare />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitterSquare />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
