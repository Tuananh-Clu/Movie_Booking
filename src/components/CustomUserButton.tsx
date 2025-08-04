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
          userButtonPopoverCard: "bg-white shadow-lg border rounded-lg",
          userButtonPopoverActionButton: "hover:bg-gray-50 transition-colors",
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