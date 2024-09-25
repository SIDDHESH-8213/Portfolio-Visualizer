import React from 'react';
import { Link } from 'react-router-dom';
import videoSource from '../assets/new york city skyline.mp4'; // Update this with your video path

const HomePage = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{height : 'calc(100vh - 80px)'}}>
      {/* Background Video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full  object-cover " style={{height : 'calc(100vh - 80px)'}}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Welcome Section */}
        <section className="text-center p-8">
          <h1 className="text-5xl font-bold text-white">Welcome to Portfolio Pro</h1>
          <p className="mt-4 text-lg text-white">Analyze and optimize your investment strategy with real-time economic data.</p>
          <Link to="/analysis" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-500 transition">
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full p-8">
          <div className="p-4 text-white text-center  rounded-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold">Real-time Data Analysis</h3>
            <p className="mt-2">Analyze various asset classes in real time</p>
          </div>
          <div className="p-4 text-white text-center rounded-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold">Portfolio Management</h3>
            <p className="mt-2">Manage your portfolio effectively with our tools.</p>
          </div>
          <div className="p-4 text-white text-center  rounded-lg transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold">Economic Insights</h3>
            <p className="mt-2">Gain insights into key economic indicators.</p>
          </div>
          {/* Add more feature boxes as needed */}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
