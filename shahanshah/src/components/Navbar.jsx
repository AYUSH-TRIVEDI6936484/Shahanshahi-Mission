import { useNavigate, Link } from "react-router-dom";
import logo from "../images/image.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-amber-200 text-black px-6 py-3 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <Link to="/" className="text-xl font-bold">
            Shahanshahi Mission
          </Link>
        </div>

        {/* Right: Nav Options */}
        <div className="flex items-center gap-6">
          <a href="#books" className="hover:text-amber-600 font-medium">
            Books
          </a>
          <a href="#contact" className="hover:text-amber-600 font-medium">
            Contact Us
          </a>
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
