import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import Logo from "../assets/logo.png";


export const Header = ({setLoginState}) => {
    const [ login, setLogin] = useState( JSON.parse(localStorage.getItem("login")) || false);
    const path = useLocation();
    const [ darkMode, setDarkmode ] = useState(JSON.parse(localStorage.getItem("darkMode")) || false );
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    function handleLogin(){
        signInWithPopup(auth, provider).then((result) => {
            setLogin(true);
            localStorage.setItem("login", true);
            setLoginState(true);
            navigate("/");
        });
    }

    function handleLogout(){
        signOut(auth).then(() => {
            setLogin(false);
            localStorage.setItem("login", false);
            setLoginState(false);
            navigate("/");
        });
    }

  return (
    <section>
        <nav className="bg-white border-gray-200 dark:bg-bgH">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-6 md:h-8" alt="Logo" />
            <span className="self-center text-sm md:text-2xl font-semibold whitespace-nowrap dark:text-white">pendown</span>
        </Link>
        <div className="flex order-2 space-x-0 rtl:space-x-reverse">
            {login ? (
                <button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 md:py-2 md:px-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><span><i className="bi bi-box-arrow-left"></i> <span className="hidden md:inline">Logout</span></span></button>
            ) : (
                <button onClick={handleLogin} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-1 px-2 md:py-2 md:px-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><span><i className="bi bi-google"></i> Login</span></button>
            ) }
            <span onClick={() => setDarkmode(!darkMode)} className={`bi ${ darkMode ?  'bi-moon-fill' : 'bi-sun-fill' } dark:text-white text-xl pl-4 md:p-2 hover:cursor-pointer`}></span>
        </div>
        <div className="items-center justify-between flex w-auto order-1" id="navbar-cta">
            <div>
                <Link to="/" className={`py-1 px-2 md:py-2 md:px-3 font-medium text-black dark:text-white ${path.pathname === "/" && `rounded-lg border border-gray-950 dark:border-gray-100`}`} aria-current="page">Home</Link>
            </div>
            {login && (<div>
                <Link to="/create" className={`py-1 px-2 md:py-2 md:px-3 font-medium text-black dark:text-white ${path.pathname === "/create" && `rounded-lg border border-gray-950 dark:border-gray-100`}`} aria-current="page">Create</Link>
            </div>)}
        </div>
        </div>
        </nav>
        <hr className="border-gray-200 sm:mx-auto dark:border-gray-700" />
    </section>
  )
}
