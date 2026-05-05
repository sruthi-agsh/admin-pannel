import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useTheme } from "../context/ThemeProvider";
import Breadcrumb from "./BreadCrumbs";

function Designation() {
    const [employees, setEmployees] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/employees")
            .then(res => res.json())
            .then(data => setEmployees(data));
    }, []);

    const colors = ['#7986cb', '#4db6ac', '#f06292', '#ffb74d', '#81c784',
        '#64b5f6', '#ba68c8', '#4dd0e1', '#ff8a65', '#a1887f'];

    const departments = [...new Set(employees.map(e => e.department))];
    const deptCount = (dept) => employees.filter(e => e.department === dept).length;

    return (
      <div className="min-h-screen bg-indigo-100 dark:bg-black flex">
            
            <div className=" flex flex-col w-full">
             
                <Breadcrumb/>
                <main className="flex-1 p-6 flex flex-col gap-6 min-w-0">

                    <p className="text-indigo-700 dark:text-white font-semibold text-lg">Designations by Role</p>

                    <div className="grid grid-cols-3 gap-5">
                        {departments.map((dept, i) => (
                            <div
                                key={dept}
                                onClick={() => setSelectedDept(selectedDept === dept ? null : dept)}
                                className={`bg-white dark:bg-black rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-md
                                    ${selectedDept === dept
                                        ? "border-indigo-500 shadow-md dark:border-white"
                                        : "border-gray-100 hover:border-indigo-200 dark:hover:border-white"}`}>
                              
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
                                    style={{ background: colors[i % colors.length] }}>
                                    {dept[0]}
                                </div>

                              
                                <p className="text-gray-800 dark:text-white font-semibold text-base mb-1">{dept}</p>

                               
                                <div className="mb-4">
                                    {employees
                                        .filter(e => e.department === dept)
                                        .map(e => (
                                            <p key={e.id} className="text-gray-500 dark:text-white text-xs py-0.5">
                                                • {e.designation}
                                            </p>
                                        ))}
                                </div>

                              
                                {/* <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white">
                                    <span className="text-xs text-gray-400">Total Employees</span>
                                    <span
                                        className="text-sm font-bold px-3 py-1 rounded-full text-white"
                                        style={{ background: colors[i % colors.length] }}
                                    >
                                        {deptCount(dept)} */}
                                    {/* </span>
                                </div> */}
                            </div>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Designation;