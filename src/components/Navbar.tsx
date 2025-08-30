import { useEffect, useState } from "react";
import Logo from "../assets/2040698.png";
import { useNavigate } from "react-router";
import { MenuLogin } from "./MenuLogin";
import { useUser } from "../config/AuthContext";
import { Search } from "./Navbar Components/Search";
import { MobileMenu } from "./Navbar Components/MobileMenu";
import CustomUserButton from "./CustomUserButton";
import { Ticket } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [ChangeColorBar, setChangeColorBar] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setChangeColorBar(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-between px-10 lg:px-20 w-full z-50 transition-colors duration-300 ${
        ChangeColorBar ? "bg-transparent" : "bg-black/70"
      } text-white py-4 backdrop-blur-md`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-10 h-10 object-contain" />
        <h1 className="text-2xl font-bold tracking-wide">AP</h1>
      </div>

      <ul className="hidden md:flex flex-row gap-4 items-center text-sm font-medium px-6 py-2 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur">
        <li
          onClick={() => navigate("/")}
          className="cursor-pointer transition hover:text-[--color-brand-pink]"
        >
          Home
        </li>
        <li
          onClick={() => navigate("/Theater")}
          className="cursor-pointer transition hover:text-[--color-brand-pink]"
        >
          Theater
        </li>
        <li
          onClick={() => {
            navigate("/Tickets");
          }}
          className="cursor-pointer transition hover:text-[--color-brand-pink]"
        >
          Tickets
        </li>
        <li
          onClick={() => navigate("/News")}
          className="cursor-pointer transition hover:text-[--color-brand-pink]"
        >
          News
        </li>
      </ul>
      {toggleSearch ? <Search /> : ""}
      <div className="flex items-center gap-4 relative">
        <i
          onClick={() => {
            setToggleSearch((prev) => !prev);
          }}
          className="fa-solid fa-magnifying-glass text-xl cursor-pointer transition hover:text-pink-600"
        />
        <Ticket className="cursor-pointer hover:text-pink-600" onClick={()=>navigate("/Voucher")}/>
        <div className="block md:hidden">
          <i
            onClick={() => {
              setToggleMobileMenu((prev) => !prev);
            }}
            className="fa-solid fa-bars text-xl cursor-pointer transition hover:text-[--color-brand-cyan]"
          ></i>
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <p className="text-sm hidden sm:inline">
              Xin chào, <span className="font-semibold">{user?.name}</span>
            </p>
            <CustomUserButton/>
          </div>
        ) : (
          <button
            onClick={() => setToggleMenu(true)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-white"
          >
            <i className="fa-solid fa-user text-lg"></i>
            <span className="hidden sm:block">Đăng nhập</span>
          </button>
        )}
      </div>
      
      {/* Modal đăng nhập/đăng ký */}
      <MenuLogin isOpen={toggleMenu} onClose={() => setToggleMenu(false)} />
      
      {toggleMobileMenu ? <MobileMenu setState={setToggleMobileMenu} /> : ""}
    </div>
  );
};
