import { useEffect, useState } from "react";
import authService from "./service/auth.service.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./app/authSlice.js";
import { Header,Footer } from "./components/index.js";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // authService.login("souptik@gmail.com","12345678").then((data)=>{
    //   console.log(data);
      
    // })
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData);

          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-700"> 
    <div className="w-full block">
    <Header/>
    <main>
      {/* <Outlet/> */}
    </main>
    <Footer/>
    </div>
     </div>
  ) : null
}

export default App;
