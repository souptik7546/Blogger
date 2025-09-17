import { LogoutBtn, Logo, Container } from "../index.js";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import useTheme from "../../contexts/theme.js";
import { useSelector } from "react-redux";

function Header() {
  
  const authStatus = useSelector((state) => state.status);
  // const authStatus = false;
  // console.log(authStatus);
  

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: "true",
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All-Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const { themeMode, setlightTheme, setdarkTheme } = useTheme();

  const onThemeChange = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      setdarkTheme(); // checked → enable dark mode
    } else {
      setlightTheme(); // unchecked → enable light mode
    }
    
  };

  return (
    <Container>
      <nav className="bg-gray-100 dark:bg-gray-900 shadow-md w-full rounded-b-lg">
        <div className=" mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand / Logo */}
          <Link to={"/"} className="text-xl font-bold text-gray-800 dark:text-white">
            Blogger
          </Link>
          <ul className="flex ml-auto items-center gap-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-400 dark:text-gray-200 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={onThemeChange}
                  checked={themeMode === "dark"}
                />

                <div
                  className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                 peer-checked:bg-blue-600
                  relative
                   after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white"
                ></div>

                {/* Sun & Moon icons */}
                <Sun className="absolute left-1 w-4 h-4 text-yellow-600 peer-checked:hidden" />
                <Moon className="absolute right-1 w-4 h-4 text-gray-400 hidden peer-checked:block" />
              </label>
            </li>
          </ul>
        </div>
      </nav>
    </Container>
  );
}

export default Header;
