import { useEffect, useState } from "react";
import Logo from "../assets/2040698.png";
import { useNavigate } from "react-router";
import { MenuLogin } from "./MenuLogin";
import { useUser } from "@clerk/clerk-react";
import { Search } from "./Navbar Components/Search";
import { MobileMenu } from "./Navbar Components/MobileMenu";
import CustomUserButton from "./CustomUserButton";

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
        ChangeColorBar ? "bg-transparent" : "bg-black/90"
      } text-white py-4 backdrop-blur-md`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-10 h-10 object-contain" />
        <h1 className="text-2xl font-bold tracking-wide">AP</h1>
      </div>

      <ul className="hidden md:flex flex-row gap-4 items-center text-sm font-medium bg-black/30 px-6 py-2 rounded-2xl">
        <li
          onClick={() => navigate("/")}
          className="hover:text-red-400 cursor-pointer transition"
        >
          Home
        </li>
        <li
          onClick={() => navigate("/Theater")}
          className="hover:text-red-400 cursor-pointer transition"
        >
          Theater
        </li>
        <li
          onClick={() => {
            navigate("/Tickets");
          }}
          className="hover:text-red-400 cursor-pointer transition"
        >
          Tickets
        </li>
        <li
          onClick={() => navigate("/News")}
          className="hover:text-red-400  cursor-pointer transition"
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
          className="fa-solid fa-magnifying-glass text-xl cursor-pointer hover:text-yellow-400 transition"
        />
        <div className="block md:hidden">
          <i
            onClick={() => {
              setToggleMobileMenu((prev) => !prev);
            }}
            className="fa-solid fa-bars text-xl  cursor-pointer hover:text-yellow-400 transition"
          ></i>
        </div>
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <p className="text-sm hidden sm:inline">
              Xin chào, <span className="font-semibold">{user.fullName}</span>
            </p>
            <CustomUserButton/>
          </div>
        ) : (
          <>
            <i
              onClick={() => setToggleMenu((prev) => !prev)}
              className="fa-solid fa-user text-xl cursor-pointer hover:text-blue-400 transition"
            />

            {toggleMenu && (
              <div className="absolute right-0 top-12 bg-black/80 text-white p-4 rounded-xl  shadow-lg backdrop-blur-md">
                <MenuLogin />
              </div>
            )}
          </>
        )}
      </div>
      {toggleMobileMenu ? <MobileMenu setState={setToggleMobileMenu} /> : ""}
    </div>
  );
};
