import { useLocation, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const routeMap = {
    "/dashboard":   { label: "Dashboard",     parent: null },
    "/employee":    { label: "Employee List",  parent: { label: "Employees", path: "/employee" } },
    "/designation": { label: "Designation",    parent: { label: "Employees", path: "/employee" } },
    "/attendance":  { label: "Attendance",     parent: { label: "Work Log",  path: "/attendance" } },
    "/latereason":  { label: "Late Comers",    parent: { label: "Work Log",  path: "/latereason" } },
};

function Breadcrumb() {
    const location = useLocation();
    const current = routeMap[location.pathname];

    if (!current) return null;

    return (
        <nav className="flex items-center gap-1.5 text-sm">
            {current.parent ? (
                <>
                    <span className="text-gray-600 dark:text-white font-semibold cursor-pointer transition-colors text-base mx-2">
                        {current.parent.label}
                    </span>
                    <span className="text-gray-800 dark:text-white text-xl">›</span>
                    <span className="text-indigo-600 dark:text-white font-medium text-base">{current.label}</span>
                </>
            ) : (
                <span className="text-indigo-600 dark:text-white font-medium text-xl">{current.label}</span>
            )}
        </nav>
    );
}

export default Breadcrumb;