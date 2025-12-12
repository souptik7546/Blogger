import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import {Protected} from "./components/index";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route path='/signup' element={
        <Protected authentication={false}>
          <Signup/>
        </Protected>
      }
      />
      <Route path="/all-post" element={<AllPost/>}/>
      <Route path='/add-post' element={
        <Protected authentication>
          <AddPost/>
        </Protected>
      }
      />
      <Route path='/edit-post/:post' element={
        <Protected authentication={false}>
          <EditPost/>
        </Protected>
      }
      />
      <Route path="/post/:post" element={<Post/>}/>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
