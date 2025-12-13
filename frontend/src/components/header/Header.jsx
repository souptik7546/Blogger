import { Container, Logo, LogoutBtn } from "../index.js";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../features/theme/themeSlice.js";

function Header() {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [openMenu, setOpenMenu] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userImage= useSelector((state)=> state.auth.userData?.avatar)
  const navigate= useNavigate()
  
  useEffect(() => {
    const mode = darkTheme ? "dark" : "light";

    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(mode);
  }, [darkTheme]);

  const navLinks = [
    { name: "Home", path: "/", active: true },
    { name: "All Posts", path: "/all-post", active: true },
    { name: "Add Post", path: "/add-post", active: authStatus },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
  ];

  return (
    <Container>
      <header className="w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800">
        <div className=" mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-gray-900 dark:text-gray-100"
          >
            <Logo />
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul className="flex items-center gap-6">
              {navLinks.map(
                (link) =>
                  link.active && (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            {/* Theme Toggle */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkTheme}
                onChange={() => dispatch(changeTheme())}
                className="hidden"
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full relative transition">
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white dark:bg-gray-200 shadow transform transition ${
                    darkTheme ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {darkTheme ? <Moon size={18} /> : <Sun size={18} />}
              </span>
            </label>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-4">
              {/* Profile Dropdown */}
              {authStatus && (
                <button onClick={()=>{
                  navigate("/profile")
                }}>
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-gray-500"
                  />
                </button>
              )}

              {/* Logout Button */}
              {authStatus && <LogoutBtn />}
            </div>
          </div>
        </div>
      </header>
    </Container>
  );
}

export default Header;
