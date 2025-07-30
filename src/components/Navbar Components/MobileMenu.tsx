import type React from "react";
import { useNavigate } from "react-router";


type MobileMenu={
    setState:React.Dispatch<React.SetStateAction<boolean>>
}
export const MobileMenu = ({setState}:MobileMenu) => {
    const navigate=useNavigate();
  return (
    <div className="fixed  top-0 left-0 w-full h-screen flex items-center justify-center bg-black/70">
        
            <ul className="flex flex-col items-center gap-8 relative rounded-2xl  px-40 bg-gray-900 py-20  text-white text-2xl font-semibold">
        <i onClick={()=>setState(false)} className="fa-solid cursor-pointer fa-x absolute top-0 right-0 p-8 fa-l"></i>
        <li onClick={()=>{navigate("/")}} className="hover:text-red-500 cursor-pointer transition">Home</li>
        <li onClick={()=>{navigate("/Theater")}} className="hover:text-red-500   cursor-pointer transition">Theater</li>
        <li onClick={()=>{navigate("/Tickets")}} className="hover:text-red-500  cursor-pointer transition">Ticket</li>
        <li onClick={()=>{navigate("/News")}} className="hover:text-red-500  cursor-pointer transition">News</li>
      </ul>
        </div>
  );
};
