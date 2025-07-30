import {
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

export const MenuLogin = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();


  const fetchUser = async () => {
    const token=await getToken();
    const body={
      Id:user?.id,
      Email:user?.emailAddresses,
      Name:user?.fullName,
      Avatar:user?.imageUrl
    }
    await axios.post("https://localhost:7083/api/Client/AddUser",{
            headers:{
              Authorization:`Bearer ${token}`,
              body:JSON.stringify(body)  

      }
    }

    )
  }
useEffect(()=>{
if(isSignedIn){
  fetchUser()
  console.log("Gui thanh cong")
}
},[isSignedIn])
  return (
    <div className="flex flex-col items-start gap-4 p-4 border rounded-xl shadow-md">
      {isSignedIn ? (
        <>
          <div className="flex items-center gap-4">
            <UserButton />
            <div>
              <p className="text-white font-semibold">
                Xin chào, {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <SignOutButton>
            <button className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg">
              Đăng Xuất
            </button>
          </SignOutButton>
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg">
            Đăng Nhập / Đăng Ký
          </button>
        </SignInButton>
      )}
    </div>
  );
};
