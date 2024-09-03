import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center mt-7 bg-white dark:bg-gray-900 h-28">
     
        <div className="sm:flex  flex-col sm:items-center sm:justify-between">
          <span className="mb-2 text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="https://flowbite.com/" className="hover:underline">fresh cart</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaFacebook className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Facebook page</span>
            </a>
           
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FaTwitter className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FaGithub className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FaDribbble className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      
    </footer>
  );
};

export default Footer;
