import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function NavBar({ collapsed, setCollapsed }) {
    const { dark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <nav className="bg-indigo-400 dark:bg-gray-900 flex items-center justify-between px-6 py-3">
            <div>
                <button
                    onClick={() => {
                        setCollapsed(!collapsed);
                        
                    }}
                    className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg bg-white/60 dark:bg-black transition-all">
                    {collapsed
                        ? <ChevronRightIcon className="text-[20px] text-white"/>
                        : <ChevronLeftIcon  className="text-[20px] text-white" />
                    }
                </button>
            </div>

            <div className="flex justify-center gap-3">

         
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm transition-all"
                >
                    {dark ? <LightModeIcon style={{ fontSize: 18 }} /> : <DarkModeIcon style={{ fontSize: 18 }} />}
                </button>

             
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0) || "S"}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-white text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-white/60 text-xs mt-2">{user.department}</p>
                    </div>
                </div>

               
                <button
                    onClick={logout}
                    title="Logout"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                               text-white/80 hover:bg-red-500 hover:text-white
                               border border-white/20 hover:border-red-500
                               transition-all"
                >
                    <LogoutIcon style={{ fontSize: 16 }} />
                    <span className="hidden sm:inline">Logout</span>
                </button>

            </div>
        </nav>
    );
}

export default NavBar;