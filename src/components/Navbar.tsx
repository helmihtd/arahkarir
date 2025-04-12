import { Search, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                CareerPath
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search professions..."
                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-primary-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}