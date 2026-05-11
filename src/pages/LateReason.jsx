import BASE_URL from "../config";
import axios from "axios";
import { useState, useEffect } from 'react';
import Breadcrumb from "./BreadCrumbs";
function LateReason() {
    const [late, setLate] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/attendance`)
            .then(response => {
                setLate(response.data);
            });
    }, []);

    
    const lateOnly = late.filter(a => a.status === "Late");

    
    const getColor = (reachedTime) => {
        const [hour, min] = reachedTime.split(":").map(Number);
        const delay = (hour * 60 + min) - 600; 

        if (delay <= 10) return "bg-green-100 text-green-700";   
        if (delay <= 30) return "bg-orange-100 text-orange-700"; 
        return "bg-red-100 text-red-700";                        
    };

    const getDelay = (reachedTime) => {
        const [hour, min] = reachedTime.split(":").map(Number);
        const delay = (hour * 60 + min) - 600;
        return `+${delay} min late`;
    };

    return (
        <div className="min-h-screen bg-indigo-100 dark:bg-gray-900 flex">
           
            <div className=" flex flex-col w-full">
                
                 <Breadcrumb/>
                <main className="flex-1 p-6 min-w-0">

                    <p className="text-gray-700 font-semibold text-lg mb-4 dark:text-white">
                        Late Comers ({lateOnly.length})
                    </p>

                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden dark:bg-black dark:text-white">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-black">
                                <tr>
                                    <th className="text-left px-4 py-3 text-gray-500 dark:text-white">Sl.no</th>
                                    <th className="text-left px-4 py-3 text-gray-500 dark:text-white">Name</th>
                                    <th className="text-left px-4 py-3 text-gray-500 dark:text-white">Date</th>
                                    <th className="text-left px-4 py-3 text-gray-500 dark:text-white">Reached Time</th>
                                    <th className="text-left px-4 py-3 text-gray-500 dark:text-white">Delay</th>
                                    <th className="text-left px-4 py-3 text-gray-500 dark:text-white">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lateOnly.map((rec, i) => (
                                    <tr key={rec.id}
                                        className="border-t border-gray-100 hover:bg-gray-50 dark:bg-black dark:text-white">
                                        <td className="px-4 py-3 text-gray-400 dark:text-white">{i + 1}</td>
                                        <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{rec.name}</td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-white">{rec.date}</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-white">{rec.reachedTime}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium dark:text-white ${getColor(rec.reachedTime)}`}>
                                                {getDelay(rec.reachedTime)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-white">{rec.delayReason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default LateReason;