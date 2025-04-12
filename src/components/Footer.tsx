import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-500 hover:text-gray-900">About</Link></li>
              <li><Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
              <li><Link to="/guides" className="text-base text-gray-500 hover:text-gray-900">Guides</Link></li>
              <li><Link to="/help" className="text-base text-gray-500 hover:text-gray-900">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Social</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">LinkedIn</a></li>
              <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; 2024 CareerPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}