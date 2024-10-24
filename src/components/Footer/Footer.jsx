import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();
  // console.log();
  return (
    <div
      className={`hidden lg:block ${
        location.pathname.includes("share") ? "fixed left-0 bottom-0" : "static"
      } bg-[#000] left-0 w-full`}
    >
      <footer className="text-center py-2 flex flex-col md:flex-row md:justify-between items-center text-grey w-10/12 mx-auto pb-[70px] lg:pb-2">
        <ul className="flex flex-wrap gap-x-2 gap-y-1 justify-center md:gap-2 mb-2 md:mb-0 text-sm">
          <li className="w-fit">
            <a
              href="https://forevisiondigital.com/digital-distribution-agreement/"
              target="_blank"
              className="hover:text-grey-dark transition"
            >
              Terms And Condition
            </a>
          </li>
          <li className="w-fit">
            <a
              href="https://forevisiondigital.com/privacy-policy/"
              target="_blank"
              className="hover:text-grey-dark transition"
            >
              Privacy Policy
            </a>
          </li>
          <li className="w-fit">
            <a
              href="https://forevisiondigital.com/cancellation-refund-policy/"
              target="_blank"
              className="hover:text-grey-dark transition"
            >
              Refund Policy
            </a>
          </li>
          <li className="w-fit">
            <a
              href="https://forevisiondigital.com/contact-us/"
              target="_blank"
              className="hover:text-grey-dark transition"
            >
              Contact Us
            </a>
          </li>
          <li className="w-fit">
            <a
              href="https://forevisiondigital.com/support/"
              target="_blank"
              className="hover:text-grey-dark transition"
            >
              Help
            </a>
          </li>
        </ul>

        <div className="mb-2 md:mb-0 text-xs md:text-sm">
          &copy; {year} ForeVision Digital | All rights reserved
        </div>

        <div className="flex gap-1 md:gap-2 items-center">
          <a href="https://www.facebook.com/forevisiondigital">
            <FaFacebookSquare className="text-[#3b5998] text-sm md:text-heading-5" />
          </a>
          <a href="https://www.instagram.com/forevisiondigital/">
            <FaInstagramSquare className="text-[#d62976] text-sm md:text-heading-5" />
          </a>
          <a href="https://twitter.com/ForeVisionIn">
            <FaXTwitter className="text-white text-sm md:text-heading-5" />
          </a>
          <a href="https://www.youtube.com/channel/UCGPHBKBHGr_G16oM6SoLMRA">
            <FaYoutube className="text-[#ff0000] text-sm md:text-heading-4" />
          </a>
          <a href="https://www.linkedin.com/company/forevisiondigital/">
            <FaLinkedin className="text-[#0077b5] text-sm md:text-heading-5" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
