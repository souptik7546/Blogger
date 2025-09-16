import { useEffect, useState } from "react";
import authService from "./service/auth.service.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./app/authSlice.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme.js";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const [themeMode, setthemeMode] = useState("dark");

  const setdarkTheme = () => {
    setthemeMode("dark");
  };

  const setlightTheme = () => {
    setthemeMode("light");
  };
  
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    // authService.login("souptik@gmail.com","12345678").then((data)=>{
    //   console.log(data);

    // })
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log(userData.status);

          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
      })
      .finally(() => {
        console.log("111111111");

        setloading(false);
      });
  }, []);

  return !loading ? (
    <ThemeProvider value={{ themeMode, setdarkTheme, setlightTheme }}>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-700">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  ) : null;
}

export default App;
