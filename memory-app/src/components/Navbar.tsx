import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 shadow-lg fixed w-full top-0 left-0 z-50">
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-400 transition duration-300">Home</Link>
        </li>
        <li>
          <Link to="/info" className="hover:text-gray-400 transition duration-300">Info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
