/** @format */

import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 w-full bg-gray-900 bg-opacity-95 p-4 "
      style={{ zIndex: "100" }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg">Youtube Playlists</div>
          <div className="flex space-x-4">{/* Add more links as needed */}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
