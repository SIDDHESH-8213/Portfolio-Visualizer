import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#dee2e6] p-[15px] text-[#333] flex flex-row justify-between mt-5 text-[13px]">
      <div>@ Portfolio Viz..</div>
      <div className="flex flex-row justify-between w-[25%] mr-9">
        <Link to="/">Contact</Link>
        <Link to="/">About</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Terms</Link>
      </div>
    </footer>
  );
};

export default Footer;
