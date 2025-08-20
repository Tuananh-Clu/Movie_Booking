import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Calendar, User} from "lucide-react";

export default function CustomUserButton() {
  const navigate = useNavigate();
  

  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          userButtonAvatarBox: "w-10 h-10",
          userButtonPopoverCard: "text-white bg-white/5 backdrop-blur ring-1 ring-white/10 shadow-lg border-0 rounded-lg",
          userButtonPopoverActionButton: "hover:bg-white/10 transition-colors",
        },
      }}
    >
      <UserButton.MenuItems>
        {/* My Booking */}
        <UserButton.Action
          label="My Booking"
          labelIcon={<Calendar className="w-4 h-4" />}
          onClick={() => navigate('/Tickets')}
        />
        
        {/* User Profile */}
        <UserButton.Action
          label="My Profile"
          labelIcon={<User className="w-4 h-4" />}
          onClick={() => navigate('/profile')}
        />
        
      </UserButton.MenuItems>
    </UserButton>
  );
}