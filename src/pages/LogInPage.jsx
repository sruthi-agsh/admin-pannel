import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../context/ThemeProvider";

import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


function LogInPage() {

    // const [users, setUsers] = useState([]);
    const [showReset, setShowReset] = useState(false);
    // const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // const [sName, setSName] = useState("");
    // const [sEmail, setSEmail] = useState("");
    // const [sPass, setSPass] = useState("");

    // Reset fields
    const [rEmail, setREmail] = useState("");
    const [rPass, setRPass] = useState("");
    const [rConfirm, setRConfirm] = useState("");
    const [authUsers, setAuthUsers] = useState({});
    const [term, setTerm] = useState(false);
    const [policy, setPolicy] = useState(false);


    useEffect(() => {
        document.title = `LogIn Page`;
    }, []);

    const { login } = useAuth();
    async function FetchData() {
        try {
            const response = await fetch('http://localhost:5000/employees');
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            const data = await response.json();

            const auth_users = {};
            data.forEach(u => {
                auth_users[u.emailId.toLowerCase()] = {
                    name: u.name,
                    emailId: u.emailId.toLowerCase(),
                    password: u.password,
                    department: u.department,
                };
            });

            setAuthUsers(auth_users);

        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        FetchData();
    }, []);
    const navigate = useNavigate();

    const handleLogIn = () => {
        // const storedData = JSON.parse(localStorage.getItem("auth_users") || "{}");
        //          console.log("Stored Data:", storedData);       
        //   console.log("Entered Email:", email);            
        //   console.log("Entered Password:", password);
        if (Object.keys(authUsers).length === 0) {
            toast.error("No users loaded. Check if json-server is running.");
            return;
        }
        // const foundUser = Object.values(storedData).find((user) => user.emailId === email && user.password === password);



        const foundUser = Object.values(authUsers).find(
            (user) =>
                user.emailId === email.toLowerCase() &&
                user.password === password
        );
        if (foundUser) {
            toast.success("Login successful! 🎉");
            login(foundUser);
            navigate("/dashboard");

        }
        else {
            toast.error("Email is not Found ❌");
        }
    }
    // function handleSignup() {
    //     if (!sName || !sEmail || !sPass) {
    //         toast.error("All fields required.");
    //         return;
    //     }
    //     if (sPass.length < 6) {
    //         toast.error("Password min 6 chars.");
    //         return;
    //     }

    //     const users = JSON.parse(localStorage.getItem("auth_users") || "{}");
    //     const key = sEmail.toLowerCase();

    //     if (users[key]) {
    //         alert("Email already registered.");
    //         return;
    //     }

    //     users[key] = { name: sName, email: key, password: sPass };
    //     localStorage.setItem("auth_users", JSON.stringify(users));
    //     toast.success("Account created! You can now log in.");
    //     setSignUp(false);
    //     setSName(""); setSEmail(""); setSPass("");
    // }
    async function handleReset() {
        if (!rEmail || !rPass || !rConfirm) {
            toast.error("All fields required.");
            return;
        }
        if (rPass !== rConfirm) {
            toast.error("Passwords do not match.");
            return;
        }
        try {

            const response = await fetch(
                `http://localhost:5000/employees?emailId=${rEmail.toLowerCase()}`
            );
            const users = await response.json();
            if (users.length === 0) {
                toast.error("No account found.");
                return;
            }
            const user = users[0];
            // Step 2: Update password using PATCH
            await fetch(`http://localhost:5000/employees/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: rPass,
                }),
            });
            toast.success("Password updated! Please log in.");
            setShowReset(false);
            setREmail("");
            setRPass("");
            setRConfirm("");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }
    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            style={{ backgroundImage: `url('/images/logInBg.jpg')` }}
            className="bg-cover bg-center h-screen flex items-center justify-center"
        >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-96 flex flex-col gap-4">
                {/* <h1 className='lg:text-3xl text-purple-900 font-semibold'>Welcome back</h1> */}
                <h2 className="text-3xl font-semibold text-purple-700 text-center">
                    Login To Continue
                </h2>
                {/* onClick={() => {
                    setSignUp(true) }}*/}
                {/* <p className="text-sm text-center cursor-pointer hover:underline text-gray-800"
                >
                    No account?<span className='text-lg font-medium text-fuchsia-950'> Sign up</span>
                </p> */}
                {/* {signUp && (
                    <div className="absolute inset-0  bg-white backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-96">
                        <button className="border border-purple-200 self-end font-extrabold text-lg text-purple-950 rounded-lg p-1 bg-purple-200" onClick={() => setSignUp(false)}>
                            ✕
                        </button>
                        <div className='flex flex-col gap-2 '>

                            <h2 className="text-3xl font-semibold text-purple-700 text-center -mt-4">Create Account</h2>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={sName}
                                className="border border-purple-400 w-full p-2 rounded-xl bg-white/20 outline-none focus:border-purple-500 focus:border-2 transition-all"
                                required
                                onChange={e => setSName(e.target.value)}
                            /> */}
                {/* <input
                                type="email"
                                placeholder="Enter your email"
                                value={sEmail}
                                className="border border-purple-400 w-full p-2 rounded-xl bg-white/20 outline-none focus:border-purple-500 focus:border-2 transition-all"
                                required
                                onChange={e => setSEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                value={sPass}
                                autoComplete="off"
                                data-lpignore="true"
                                 data-form-type="other"
                                className="border border-purple-400 w-full p-2 rounded-xl bg-white/20 outline-none focus:border-purple-500 focus:border-2 transition-all"
                                required
                                onChange={e => setSPass(e.target.value)}
                            /> */}
                {/* <button className="bg-purple-500 hover:bg-purple-800 text-white py-2 rounded-2xl w-full text-lg font-medium" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                )} */}
                <div className='flex items-center bg-white/20 border border-purple-400 w-full rounded-xl transition-all focus-within:border-2 focus-within:border-purple-500'>
                            <span className="text-gray-300 pl-2 flex items-center">
                                <EmailIcon />
                            </span>
                            <input
                             autoFocus
                                type="email"
                                placeholder="you@gmail.com"
                                value={email}
                                className="p-2 w-full bg-transparent outline-none text-black placeholder-gray-300"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                <div className='relative w-full'>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-purple-400 w-full p-2 rounded-xl bg-white/20 outline-none focus:border-purple-500 focus:border-2 transition-all"
                    />
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 top-2">

                        {showPassword ? <Visibility /> : <VisibilityOff />}

                    </button>
                    {password.length > 0 && password.length < 6 && (
                        <p className="text-red-500 text-sm mt-1">
                            Password must be at least 6 characters
                        </p>
                    )}
                </div>

                <button className="bg-purple-500 hover:bg-purple-800 text-white py-2 rounded-2xl text-lg font-medium" onClick={handleLogIn}>
                    Log In
                </button>
                <button id="forgotPass" className="text-slate-500 text-sm  hover:underline "
                    onClick={() => { setShowReset(true); }}>Forgot
                    Password?
                </button>
                {showReset && (
                    <div id="reset" className="absolute inset-0  flex flex-col  items-center gap-2  bg-white backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-[400px] h-[450px]">
                        <span className="text-indigo-700 p-3 flex items-center rounded-full bg-gray-100 border border-indigo-200/20">
                                <LockOutlinedIcon />
                            </span>
                        <h2 className="text-3xl font-semibold text-purple-700 text-center mb-1">Reset Password</h2>
                        <p className="text-sm text-blue-950 text-center mb-3">Enter your details to set a new password</p>

                        <div className='flex items-center bg-white/20 border border-purple-400 w-full rounded-xl transition-all focus-within:border-2 focus-within:border-purple-500'>
                            <span className="text-gray-300 pl-2 flex items-center">
                                <EmailIcon />
                            </span>
                            <input
                                type="email"
                                placeholder="you@gmail.com"
                                value={rEmail}
                                className="p-2 w-full bg-transparent outline-none text-black placeholder-gray-300"
                                required
                                onChange={e => setREmail(e.target.value)}
                            />
                        </div>


                       <div className='flex items-center bg-white/20 border border-purple-400 w-full rounded-xl transition-all focus-within:border-2 focus-within:border-purple-500'>
                            <span className="text-gray-300 pl-2 flex items-center">
                                <LockIcon />
                            </span>
                            <input
                                type="password"
                                placeholder="Min.6 character"
                                value={rPass}
                                className="p-2 w-full bg-transparent outline-none text-black placeholder-gray-300"
                                required
                               onChange={e => setRPass(e.target.value)}
                            />
                        </div>
                            
                         <div className='flex items-center bg-white/20 border border-purple-400 w-full rounded-xl transition-all focus-within:border-2 focus-within:border-purple-500'>
                            <span className="text-gray-300 pl-2 flex items-center">
                                <VerifiedUserIcon />
                            </span>
                            <input
                                type="password"
                                placeholder="Re-enter Password"
                                value={rConfirm}
                                className="p-2 w-full bg-transparent outline-none text-black placeholder-gray-300"
                                required
                               onChange={e => setRConfirm(e.target.value)}
                            />
                        </div>

                        <button id="submitBtn1" className="bg-purple-500 hover:bg-purple-800 text-white py-2 px-2 rounded-2xl w-full text-base " onClick={handleReset}>
                            Reset Password
                        </button>
                        <button
                            className="text-indigo-300 text-sm hover:underline"
                            onClick={() => { setShowReset(false); }}
                        >
                            ← Back to Login
                        </button>
                    </div>
                )}
                <div className="text-center text-sm text-gray-500 mt-4 flex flex-col gap-1">

                    <p>
                        Copyright © 2026 Space Age. All rights reserved.

                        <Link to="/terms" className="text-blue-500 underline cursor-pointer hover:text-blue-700">
                            Terms & Conditions
                        </Link>{" "}
                        |{" "}
                        <Link to="/privacy" className="text-blue-500 underline cursor-pointer hover:text-blue-700">
                            Privacy Policy
                        </Link>
                    </p>

                </div>
            </div>

        </div>

    );
}

export default LogInPage;