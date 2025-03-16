import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <Link className="link link-hover" to="">
            About us
          </Link>
          <Link className="link link-hover" to="">
            Contact
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link target="_blank" to="https://www.facebook.com/sstanu">
              <FaFacebook className="text-4xl" />
            </Link>
            <Link target="_blank" to="https://www.youtube.com/">
              <FaYoutube className="text-4xl" />
            </Link>
            <Link target="_blank" to="https://www.x.com/sstanu">
              <FaXTwitter className="text-4xl" />
            </Link>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Engadge Board Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
