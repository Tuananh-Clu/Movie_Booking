import { useNavigate } from "react-router-dom";
import { Calendar, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../config/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function CustomUserButton() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-3 py-2 text-white"
      >
        <img src={user.avatar} className="rounded-full w-10 h-10 "></img>
        <span className="hidden md:block">{user.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/5 backdrop-blur ring-1 ring-white/10 shadow-lg border-0 rounded-lg text-white z-50">
          <div className="py-2">
            {/* My Booking */}
            <button
              onClick={() => {
                navigate('/Tickets');
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
            >
              <Calendar className="w-4 h-4" />
              <span>My Booking</span>
            </button>
            
            {/* User Profile */}
            <button
              onClick={() => {
                navigate('/Profile');
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-colors text-left"
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            {/* Divider */}
            <div className="border-t border-white/20 my-1"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-white/10 transition-colors text-left text-red-400"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}