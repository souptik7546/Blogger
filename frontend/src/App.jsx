import { useEffect, useState } from "react";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";
import authService from "./service/auth.service.js";
import { login, logout } from "./features/auth/authSlice.js";
import { useDispatch } from "react-redux";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch=useDispatch()

  useEffect(() => {
    setloading(true)
    // let userData=null
  //  ;(async ()=>{
  //   userData= await authService.getCurrentUser()
  //   if(userData){
  //     console.log(userData);
  //     dispatch(login(userData))
  //     setloading(false)
  //   } else{
  //     dispatch(logout())
  //     setloading(false)
  //   }
  //  })()

  authService.getCurrentUser()
  .then((user)=>{
    dispatch(login(user.data))
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
    setloading(false)
  })
  
  }, [])
  


  return !loading ? (
      <div className="min-h-screen flex flex-wrap content-between bg-white dark:bg-gray-700">
        <div className="w-full block">
          <header className="fixed top-0 left-0 w-full z-50">
            <Header />
          </header>
          <main className="pt-18 w-full h-screen">
            <Outlet/>
          </main>
          <Footer />
        </div>
      </div>
  ) : (
 <div>loading...</div>
  );
}

export default App;
