import { useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <SideBar collapsed={collapsed} />
      
      <div className="flex-1">
        <NavBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;