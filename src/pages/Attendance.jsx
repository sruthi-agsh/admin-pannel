import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeProvider";
import Breadcrumb from "./BreadCrumbs";

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetch("http://localhost:5000/attendance")
            .then(res => res.json())
            .then(data => setAttendance(data));
    }, []);
    

    const filtered = filter === "All"
        ? attendance
        : attendance.filter(a => a.status === filter);

    const countOf = (status) => filtered.filter(a => a.status === status).length;
     const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;

    // Get current page employees(pagination)
    const totalEmployee = filtered.length;
    const indexOfLast = currentPage * employeesPerPage;
    const indexOfFirst = indexOfLast - employeesPerPage;
    const currentEmployees = attendance.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filtered.length / employeesPerPage);

    return (
        <div className="min-h-screen bg-indigo-100 dark:bg-black flex">
            
            <div className=" flex flex-col w-full">
                
                <main className="flex-1 p-6 flex flex-col gap-6 min-w-0">
                     <Breadcrumb/>

                    <div className="flex gap-4">

                        <button
                            onClick={() => setFilter("All")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all
                                ${filter === "All"
                                    ? "bg-indigo-500 text-white border-indigo-500 dark:bg-black dark:border-white"
                                    : "bg-white text-gray-600 dark:text-black border-gray-200 dark:border-white dark:hover-white hover:bg-indigo-50"}`}>
                            All
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs
                                ${filter === "All" ? "bg-white/30 text-white dark:bg-black" : "bg-gray-100 text-gray-500"}`}>
                                {attendance.length}
                            </span>
                        </button>

                        <button
                            onClick={() => setFilter("Present")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all
                                ${filter === "Present"
                                    ? "bg-green-500 text-white border-green-500"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-green-50"}`}>
                            Present
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs
                                ${filter === "Present" ? "bg-white/30 text-white" : "bg-green-100 text-green-600"}`}>
                                {countOf("Present")}
                            </span>
                        </button>

                        <button
                            onClick={() => setFilter("Absent")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all
                                ${filter === "Absent"
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-red-50"}`} >
                            Absent
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs
                                ${filter === "Absent" ? "bg-white/30 text-white" : "bg-red-100 text-red-600"}`}>
                                {countOf("Absent")}
                            </span>
                        </button>

                        <button
                            onClick={() => setFilter("Late")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all
                                ${filter === "Late"
                                    ? "bg-yellow-500 text-white border-yellow-500"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-yellow-50"}`}>
                            Late
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs
                                ${filter === "Late" ? "bg-white/30 text-white" : "bg-yellow-100 text-yellow-600"}`}>
                                {countOf("Late")}
                            </span>
                        </button>
                    </div>
                    
                    <div className="bg-white dark:bg-black rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                            <p className="text-indigo-600 dark:text-white font-medium text-sm">
                                Attendance
                                <span className="ml-2 text-xs text-gray-400 dark:text-white">
                                    ({filtered.length} records)
                                </span>
                            </p>
                            <p className="text-xs text-gray-400 dark:text-white">Date: {attendance[0]?.date}</p>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-black">
                                <tr>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Sl.no</th>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Name</th>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Date</th>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Status</th>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Reached Time</th>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Left Time</th>
                                    <th className="text-left px-4 py-2 text-gray-500 font-medium dark:text-white">Delay Reason</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-black">
                               { filter ==="All" ? currentEmployees.map((rec,i)=> (
                                <tr key={rec.id}
                                        className={i % 2 === 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800"}>
                                        <td className="px-4 py-2 text-gray-400 text-xs dark:text-white">{i + 1}</td>
                                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-white">{rec.name}</td>
                                        <td className="px-4 py-2 text-gray-500 dark:text-white">{rec.date}</td>
                                        <td className="px-4 py-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium
                                                ${rec.status === "Present"
                                                    ? "bg-green-100 text-green-700 dark:bg-black dark:text-white"
                                                    : rec.status === "Absent"
                                                        ? "bg-red-100 text-red-700 dark:bg-black dark:text-white"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-black dark:text-white"}`}>
                                                {rec.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 dark:text-white">
                                            {rec.reachedTime === "-"
                                                ? <span className="text-gray-300 dark:text-white">-</span>
                                                : rec.reachedTime}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 dark:text-white">
                                            {rec.leftTime === "-"
                                                ? <span className="text-gray-300 dark:text-white">-</span>
                                                : rec.leftTime}
                                        </td>
                                        <td className="px-4 py-2">
                                            {rec.delayReason
                                                ? <span className="text-yellow-600 dark:bg-black dark:text-white text-xs">{rec.delayReason}</span>
                                                : <span className="text-gray-300 dark:bg-black dark:text-white text-xs">-</span>}
                                        </td>
                                    </tr>

                               )):
                                filtered.map((rec, i) => (
                                    <tr key={rec.id}
                                        className={i % 2 === 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800"}>
                                        <td className="px-4 py-2 text-gray-400 text-xs dark:text-white">{i + 1}</td>
                                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-white">{rec.name}</td>
                                        <td className="px-4 py-2 text-gray-500 dark:text-white">{rec.date}</td>
                                        <td className="px-4 py-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium dark:text-white
                                                ${rec.status === "Present"
                                                    ? "bg-green-100 text-green-700"
                                                    : rec.status === "Absent"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"}`}>
                                                {rec.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 dark:text-white">
                                            {rec.reachedTime === "-"
                                                ? <span className="text-gray-300 dark:text-white">-</span>
                                                : rec.reachedTime}
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 dark:text-white">
                                            {rec.leftTime === "-"
                                                ? <span className="text-gray-300 dark:text-white">-</span>
                                                : rec.leftTime}
                                        </td>
                                        <td className="px-4 py-2">
                                            {rec.delayReason
                                                ? <span className="text-yellow-600 text-xs dark:text-white">{rec.delayReason}</span>
                                                : <span className="text-gray-300 text-xs dark:text-white">-</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                          <div className="flex justify-between py-4 border-t border-gray-100 px-4">
                                    <p className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-black text-indigo-700 dark:text-white text-sm font-medium shadow-sm border border-indigo-100">
                                        Page {currentPage} • Showing {currentEmployees.length} employees out of {totalEmployee}
                                    </p>
                                    <div className="flex justify-center items-center gap-2 pr-4">
                                        <button
                                            onClick={() => setCurrentPage(p => p - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 rounded-lg border border-indigo-300 dark:border-white text-indigo-600 dark:text-white
                                             hover:bg-indigo-100  dark:hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-sm">
                                            ← Prev
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 rounded-lg border text-sm
                                            ${currentPage === page
                                                        ? "bg-indigo-500 text-white dark:bg-black border-indigo-500"
                                                        : "border-indigo-300 text-indigo-600 dark:text-white dark:bg-black hover:bg-indigo-100"}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(p => p + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 rounded-lg border border-indigo-300
                                             text-indigo-600 hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed text-sm dark:text-white dark:bg-black">
                                            Next →
                                        </button>
                                    </div>
                                </div>
                    </div>

                </main>
           </div> </div>
    );
}

export default Attendance;