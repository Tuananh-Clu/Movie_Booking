import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { MoviesInformation } from "./Pages/MoviesInformation";
import { Theater } from "./Pages/Theater";
import { ScrollToTop } from "./components/ScrollToTop";
import { InfoTheater } from "./Pages/InfoTheater";
import { Seats } from "./Pages/Seats";
import { Payment } from "./Pages/Payment";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

import "./index.css";
import { Ticket } from "./Pages/Ticket";
import { News } from "./Pages/News";
import { Profile } from "./Pages/Profile";

function App() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  const fetchUser = async () => {
   const token = await getToken();
    const body = {
      Id: user?.id,
      Email: user?.emailAddresses[0].emailAddress,
      Name: user?.fullName,
      Avatar: user?.imageUrl,
      role:user?.firstName?.includes("A")?"Admin":"User"
    };
    console.log("👉 Gửi body:", body);
    await axios.post("https://backendformoviebooking-1.onrender.com/api/Client/AddUser", body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    if (isSignedIn) {
      fetchUser();
      console.log("Gui thanh cong");
    }
  }, [isSignedIn]);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Movies/:id" element={<MoviesInformation />} />
        <Route path="/Theater" element={<Theater />} />
        <Route path="/Theater/:id" element={<InfoTheater />} />
        <Route path="/Theater/:room/:title" element={<Seats />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Tickets" element={<Ticket />} />
        <Route path="/News" element={<News />} />
        <Route path="/Profile" element={<Profile/>}></Route>
      </Routes>
    </>
  );
}

export default App;
