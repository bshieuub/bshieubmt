
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-lg md:text-xl font-bold text-primary">BS. TỪ NGỌC HIẾU</span>
            <span className="block text-xs md:text-sm text-secondary -mt-1">Chuyên khoa Ung bướu</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <button key={link.name} onClick={() => onNavigate(link.section)} className="text-gray-600 hover:text-primary font-medium transition-colors">
                {link.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button onClick={onOpenModal} className="px-6 py-2 bg-accent text-primary font-bold rounded-full hover:bg-yellow-400 transition-all shadow-sm">
              Đặt lịch hẹn
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={onOpenModal} className="px-3 py-1.5 bg-accent text-primary font-semibold rounded-full text-sm hover:bg-yellow-400 transition-all">
              Đặt lịch
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {NAV_LINKS.map(link => (
              <button key={link.name} onClick={() => { onNavigate(link.section); setIsMenuOpen(false); }} className="text-gray-600 hover:text-primary font-medium transition-colors">
                {link.name}
              </button>
            ))}
            <button onClick={() => { onOpenModal(); setIsMenuOpen(false); }} className="mt-4 px-6 py-2 bg-accent text-primary font-bold rounded-full hover:bg-yellow-400 transition-all shadow-sm">
              Đặt lịch hẹn
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
