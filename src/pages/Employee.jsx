import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { useState, useEffect } from "react";
import Breadcrumb from "./BreadCrumbs";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [viewMode, setViewMode] = useState("list");
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;

    const colors = ['#7986cb', '#4db6ac', '#f06292', '#ffb74d', '#81c784',
        '#64b5f6', '#ba68c8', '#4dd0e1', '#ff8a65', '#a1887f'];

    const initials = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase();

    useEffect(() => {
        fetch("http://localhost:5000/employees")
            .then(res => res.json())
            .then(data => setEmployees(data));
    }, []);


    const filteredEmps = employees.filter((emp) =>
        [emp.name, emp.department, emp.city, emp.emailId, emp.gender]
            .some(field => field?.toLowerCase().includes(search.toLowerCase()))
    );


    const totalEmployee = filteredEmps.length;
    const totalPages = Math.ceil(totalEmployee / employeesPerPage);
    const indexOfFirst = (currentPage - 1) * employeesPerPage;
    const currentEmployees = filteredEmps.slice(indexOfFirst, indexOfFirst + employeesPerPage);


    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return (
        <div className="min-h-screen bg-indigo-100 dark:bg-gray-900 flex">
          
            <div className=" flex flex-col w-full">
              

                <main className="flex-1 p-6 flex flex-col gap-6">
                    <Breadcrumb />
                    <div className="flex justify-between bg-indigo-500/20 dark:bg-black dark:text-white rounded-lg px-3 py-1.5 gap-2 w-52 ml-auto">
                        <SearchIcon className="text-blue-500 dark:text-white text-[18px]" />
                        <input
                            type="search"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none text-white placeholder-indigo-500/70 dark:placeholder-white text-sm w-full"
                        />
                    </div>

                    <div className="bg-white dark:bg-black dark:text-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                            <p className="text-indigo-600 font-medium text-base dark:text-white">Employees</p>
                            <div className="flex gap-2">
                                <ViewListIcon onClick={() => setViewMode("list")} className={`dark:text-white text-[22px] cursor-pointer
                                    ${viewMode === "grid" ? "text-indigo-700" : "text-indigo-200"}`} />
                                <GridViewIcon
                                    onClick={() => setViewMode("grid")}
                                    className={`text-[22px] cursor-pointer ${viewMode === "grid" ? "text-indigo-700" : "text-indigo-200"
                                        } dark:text-white`}/>
                            </div>
                        </div>


                        {viewMode === "list" && (
                            <div className="overflow-x-auto">
                                {currentEmployees.length === 0 ? (
                                    <p className="text-center text-gray-400 py-10 dark:text-white">No employees found for "{search}"</p>
                                ) : (
                                    <table className="w-full text-sm table-fixed">
                                        <thead className="bg-gray-50 dark:bg-black dark:border-b dark:border-gray-100">
                                            <tr>
                                                <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white dark:font-bold">Name</th>
                                                <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white dark:font-bold">Gender</th>
                                                <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white dark:font-bold">DOB</th>
                                                <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white dark:font-bold">Email</th>
                                                <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white dark:font-bold">Department</th>
                                                <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white dark:font-bold">City</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentEmployees.map((emp, i) => (
                                                <tr
                                                    key={emp.id}
                                                    onClick={() => setSelectedEmp(emp)}
                                                    className={`cursor-pointer border-b border-gray-100 hover:bg-indigo-50 transition-colors  dark:bg-black
                                                    ${selectedEmp?.id === emp.id ? "bg-indigo-100" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                                    <td className="px-4 py-2 font-medium text-gray-800 truncate dark:text-white">{emp.name}</td>
                                                    <td className="px-4 py-2 text-gray-600 dark:text-white">{emp.gender}</td>
                                                    <td className="px-4 py-2 text-gray-600 dark:text-white">{emp.birthDate}</td>
                                                    <td className="px-4 py-2 text-gray-500 truncate dark:text-white">{emp.emailId}</td>
                                                    <td className="px-4 py-2 text-indigo-700 text-xs dark:text-white">{emp.department}</td>
                                                    <td className="px-4 py-2 text-gray-800 dark:text-white">{emp.city}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}


                                {totalPages > 1 && (
                                    <div className="flex justify-between py-4 border-t border-gray-100 px-4">
                                        <p className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-sm font-medium shadow-sm border border-indigo-100 dark:bg-black dark:text-white">
                                            Page {currentPage} • Showing {currentEmployees.length} of {totalEmployee}
                                        </p>
                                        <div className="flex justify-center items-center gap-2 pr-4">
                                            <button
                                                onClick={() => setCurrentPage(p => p - 1)}
                                                disabled={currentPage === 1}
                                                className="px-3 py-1 rounded-lg border border-indigo-300 text-indigo-600 hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed text-sm dark:bg-black dark:text-white dark:border-white">
                                                ← Prev
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-3 py-1 rounded-lg border text-sm
                                                    ${currentPage === page ? "bg-indigo-500 text-white border-indigo-500 dark:bg-black dark:text-white  dark:border-white" : "border-indigo-300 text-indigo-600 hover:bg-indigo-100 dark:bg-black dark:text-white dark:border-white"}`} >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setCurrentPage(p => p + 1)}
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-1 rounded-lg border border-indigo-300 text-indigo-600 dark:text-white hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed text-sm dark:bg-black dark:border-white">
                                                Next →
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}


                        {viewMode === "grid" && (
                            <div>
                                {filteredEmps.length === 0 ? (
                                    <p className="text-center text-gray-400 py-10">No employees found for "{search}"</p>
                                ) : (
                                    <div className="grid grid-cols-3 gap-4 p-4">
                                        {filteredEmps.map((emp, i) => (
                                            <div
                                                key={emp.id}
                                                onClick={() => setSelectedEmp(emp)}
                                                className={`border rounded-xl p-4 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all
                                                ${selectedEmp?.id === emp.id ? "border-indigo-500 bg-indigo-50 dark:bg-black dark:text-white" : "border-gray-200 bg-white dark:bg-black dark:text-white"}`}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 dark:bg-black"
                                                        style={{ background: colors[i % colors.length] }}>
                                                        {initials(emp.name)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-sm dark:text-white">{emp.name}</p>
                                                        <span className="bg-indigo-100 text-indigo-700 dark:bg-black dark:text-white text-xs px-2 py-0.5 rounded-full">
                                                            {emp.department}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1 text-xs text-gray-500 dark:text-white">
                                                    <p>{emp.emailId}</p>
                                                    <p>{emp.city}</p>
                                                    <p>{emp.birthDate}</p>
                                                    <p>₹{emp.salary.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Employee;