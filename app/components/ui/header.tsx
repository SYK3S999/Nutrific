import { useState } from 'react';
import { Carrot } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle

  return (
    <header className="flex justify-between items-center w-full px-4 lg:px-6 h-16 bg-green-50 shadow-sm transition-all duration-300 ease-in-out sticky top-0 z-50">
      <a className="flex items-center justify-center animate-bounce-once" href="#">
        <Carrot className="h-8 w-8 text-green-600 transition-transform duration-500 hover:scale-110" />
        <span className="ml-2 text-xl font-bold text-green-700 transition-all duration-500">NutriVie</span>
      </a>

      {/* Hamburger icon for mobile */}
      <button
        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu
        aria-label="Toggle navigation"
      >
        <div className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ${isOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
      </button>

      <nav className={`lg:flex lg:gap-4 sm:gap-6 ${isOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-green-50 p-4 shadow-md' : 'hidden'}`}>
        <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#a-propos" onClick={() => setIsOpen(false)}>
          À propos
          <span className="underline-animation"></span>
        </a>
        <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#services" onClick={() => setIsOpen(false)}>
          Services
          <span className="underline-animation"></span>
        </a>
        <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#consultation" onClick={() => setIsOpen(false)}>
          Consultation
          <span className="underline-animation"></span>
        </a>
        <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#temoignages" onClick={() => setIsOpen(false)}>
          Témoignages
          <span className="underline-animation"></span>
        </a>
        <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#reservation" onClick={() => setIsOpen(false)}>
          Réservation
          <span className="underline-animation"></span>
        </a>
        <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#contact" onClick={() => setIsOpen(false)}>
          Contact
          <span className="underline-animation"></span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
