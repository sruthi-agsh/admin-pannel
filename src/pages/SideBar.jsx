import { Link, useLocation } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useEffect } from "react";

function SideBar({ collapsed}) {
    const location = useLocation();
    // const [collapsed, setCollapsed] = useState(false);

    const empActive = isActive("/employee") || isActive("/designation");
    const wActive   = isActive("/attendance") || isActive("/latereason");

    const [empOpen, setEmpOpen] = useState(empActive);
    const [wOpen,   setWOpen]   = useState(wActive);

    function isActive(path) {
        return location.pathname === path;
    }

    useEffect(() => {
        if (empActive) setEmpOpen(true);
    }, [location.pathname]);

    useEffect(() => {
        if (wActive) setWOpen(true);
    }, [location.pathname]);

    return (
        <aside className={`
            relative flex flex-col bg-[#1e1e2f] dark:bg-black text-white shadow-xl flex-shrink-0
            min-h-screen transition-all duration-300
            ${collapsed ? "w-14" : "w-52"}`}>

          
            <div className="flex items-center justify-between px-3 py-3">
                <h3 className="text-white text-lg font-semibold">Space Age</h3>
            
                
            </div>

           
            {/* <div className={`flex items-center gap-3 py-5 border-b border-white/10 overflow-hidden
                ${collapsed ? "px-2 justify-center" : "px-4"}`}>
                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <AccountCircleIcon style={{ fontSize: 28, color: "#fff" }} />
                </div>
                {!collapsed && (
                    <div>
                        <p className="text-white font-semibold text-sm whitespace-nowrap">John Doe</p>
                        <span className="text-xs text-indigo-300">Admin</span>
                    </div>
                )}
            </div> */}

          
            <nav className="flex flex-col gap-1 p-2 flex-1">

               
                <Link to="/dashboard" title="Dashboard">
                    <div className={`flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all
                        ${collapsed ? "justify-center" : ""}
                        ${isActive("/dashboard")
                            ? "bg-indigo-600 text-white dark:bg-indigo-200"
                            : "text-gray-400 hover:bg-white/10 hover:text-white"}`}>
                        <DashboardIcon style={{ fontSize: 18, flexShrink: 0 }} />
                        {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Dashboard</span>}
                    </div>
                </Link>

              
                <div title={collapsed ? "Employees" : ""}>
                    <div
                        onClick={() => !collapsed && setEmpOpen(prev => !prev)}
                        className={`flex items-center px-2 py-2.5 rounded-lg cursor-pointer transition-all
                            ${collapsed ? "justify-center" : "justify-between"}
                            ${empActive
                                ? "bg-indigo-600 text-white dark:bg-black"
                                : empOpen
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
                    >
                        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                            <PeopleIcon style={{ fontSize: 18, flexShrink: 0 }} />
                            {!collapsed && <span className="text-sm font-medium">Employees</span>}
                        </div>
                        {!collapsed && (
                            <ExpandMoreIcon style={{
                                fontSize: 16,
                                transform: empOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s"
                            }} />
                        )}
                    </div>

                   
                    {empOpen && !collapsed && (
                        <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                            <Link to="/employee"
                                className={`text-xs py-2 px-2 rounded-lg transition-all
                                    ${isActive("/employee")
                                        ? "text-indigo-400 bg-indigo-500/20  dark:text-white dark:bg-black font-semibold"
                                        : "text-gray-400 hover:text-white hover:bg-white/10 dark:text-white dark:bg-black"}`}>
                                Employee List
                            </Link>
                            <Link to="/designation"
                                className={`text-xs py-2 px-2 rounded-lg transition-all
                                    ${isActive("/designation")
                                        ? "text-indigo-400 bg-indigo-500/20 font-semibold dark:text-white dark:bg-black"
                                        : "text-gray-400 hover:text-white hover:bg-white/10 dark:text-white dark:bg-black"}`}>
                                Designation
                            </Link>
                        </div>
                    )}
                </div>

             
                <div title={collapsed ? "Work Log" : ""}>
                    <div
                        onClick={() => !collapsed && setWOpen(prev => !prev)}
                        className={`flex items-center px-2 py-2.5 rounded-lg cursor-pointer transition-all
                            ${collapsed ? "justify-center" : "justify-between"}
                            ${wActive
                                ? "bg-indigo-600 text-white dark:bg-black"
                                : wOpen
                                    ? "bg-white/10 text-white dark:text-white dark:bg-black"
                                    : "text-gray-400 hover:bg-white/10 hover:text-white dark:text-white dark:bg-black"}`}>
                        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                            <HowToRegIcon style={{ fontSize: 18, flexShrink: 0 }} />
                            {!collapsed && <span className="text-sm font-medium dark:text-white">Work Log</span>}
                        </div>
                        {!collapsed && (
                            <ExpandMoreIcon style={{
                                fontSize: 16,
                                transform: wOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s"
                            }} />
                        )}
                    </div>

                    {wOpen && !collapsed && (
                        <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                            <Link to="/attendance"
                                className={`text-xs py-2 px-2 rounded-lg transition-all flex items-center gap-2
                                    ${isActive("/attendance")
                                        ? "text-indigo-400 bg-indigo-500/20 font-semibold dark:text-white dark:bg-black"
                                        : "text-gray-400 hover:text-white hover:bg-white/10 dark:text-white dark:bg-black"}`}>
                                <HowToRegIcon style={{ fontSize: 14 }} /> Attendance
                            </Link>
                            <Link to="/latereason"
                                className={`text-xs py-2 px-2 rounded-lg transition-all flex items-center gap-2
                                    ${isActive("/latereason")
                                        ? "text-indigo-400 bg-indigo-500/20 font-semibold dark:text-white dark:bg-black"
                                        : "text-gray-400 hover:text-white hover:bg-white/10 dark:text-white dark:bg-black"}`}>
                                <AccessTimeIcon style={{ fontSize: 14 }} /> Late Comers
                            </Link>
                        </div>
                    )}
                </div>

            </nav>
        </aside>
    );
}

export default SideBar;