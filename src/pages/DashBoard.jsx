import BASE_URL from "../config";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../styles/calendar.css'; 
import Breadcrumb from "./BreadCrumbs";
import { useAuth } from "../context/AuthContext";

function DashBoard() {
    const [employees, setEmployees] = useState([]);
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        document.title = `DashBoard`;
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/employees")
            .then(response => {
                setEmployees(response.data)
            })
    }, []);
    const totalEmployee = employees.length;
    const totalFemale = employees.filter((emp)=> emp.gender === "Female").length;
     const totalMale = employees.filter((emp)=> emp.gender === "Male").length;

     
    return (
        <div className="min-h-screen bg-indigo-100 dark:bg-gray-900 flex">
           
            <div className=" flex flex-col w-full">
                
                <div className="my-2 px-4">
                  <Breadcrumb />
                  </div>
                <div className="flex flex-col gap-8 w-full px-6">
                    <div className="grid grid-cols-3 gap-4 mt-10">
                        <div className="bg-card-teal dark:bg-gray-800 rounded-xl p-4">
                            <p className="text-cardText-teal text-xs font-medium uppercase tracking-wide">Total Employees</p>
                            <p className="text-cardText-teal text-2xl font-semibold mt-1">
                                {totalEmployee}
                            </p>
                            <p className="text-cardText-teal text-xs mt-2">All departments</p>
                        </div>
                        <div className="bg-card-purple rounded-xl p-4">
                            <p className="text-cardText-purple text-xs font-medium uppercase tracking-wide">Female Employees</p>
                            <p className="text-cardText-purple text-2xl font-semibold mt-1">{totalFemale}</p>
                            <p className="text-cardText-purple text-xs mt-2">All departments</p>
                        </div>
                        <div className="bg-card-fuchsia rounded-xl p-4  dark:bg-gray-800">
                            <p className="text-cardText-fuchsia text-xs font-medium uppercase tracking-wide">Male Employees</p>
                            <p className="text-cardText-fuchsia text-2xl font-semibold mt-1">{totalMale}</p>
                            <p className="text-cardText-fuchsia text-xs mt-2">All departments</p>
                        </div>
                    </div>
                
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4 dark:text-white">Calendar</h1>

                    <div className="bg-blue-200 dark:bg-black p-4 rounded-xl shadow-md w-fit">
                        
                        <Calendar
                            onChange={setDate}
                            value={date}
                        />
                    </div>

                </div>
                </div>
            </div>

        </div>
    )
}
export default DashBoard;