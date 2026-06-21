import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-800 text-xl tracking-widest text-lime-400 hover:text-lime-300 transition-colors">
          BREVE
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/account" className="text-sm text-forest-300 hover:text-lime-400 transition-colors font-medium">Akun</Link>
          <Link to="/login" className="text-sm btn-primary text-white px-5 py-1.5 rounded-full font-medium">Log In</Link>
          <Link to="/register" className="text-sm btn-primary text-white px-5 py-1.5 rounded-full font-medium">Sign Up</Link>
        </div>
        <button className="md:hidden text-forest-200" onClick={() => setMobileOpen(!mobileOpen)}>
          <Icon name={mobileOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-forest-700 px-5 py-4 space-y-3 bg-forest-900">
          <Link to="/account" onClick={() => setMobileOpen(false)} className="block w-full text-sm text-forest-300 hover:text-lime-400 px-5 py-2 font-medium text-center transition-colors">Akun</Link>
          <Link to="/login" onClick={() => setMobileOpen(false)} className="block w-full text-sm btn-primary text-white px-5 py-2 rounded-full font-medium text-center">Log In</Link>
          <Link to="/register" onClick={() => setMobileOpen(false)} className="block w-full text-sm btn-primary text-white px-5 py-2 rounded-full font-medium text-center">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;