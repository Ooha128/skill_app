import { useState } from "react";
import LoginPage from "../Pages/Login";
export default function Loginnav() {
    const [navbar, setNavbar] = useState(false);

    return (
        <>
        <nav className=" bg-white drop-shadow-lg px-5 ">
            <div className=" flex flex-row justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div className="flex flex-col">
                    <div className=" items-center justify-between block">
                    <img className="w-3/5 h-2/5 logo float-left" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtMBPwl1iY_dBR-4s9hx30cAAy1FiARfFT7mz6dxm&s"/></div> 
                </div>
                <div>
                <div>  <p className="text-blue-800 text-xl font-mono font-bold text-base">Skill Assessment Platform</p>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}>
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-red-700 font-semibold text-base hover:text-blue-900">
                                <a href="/problems">Explore</a>
                            </li>
                            <li className="text-red-700 font-semibold text-base hover:text-blue-900">
                                <a href="javascript:void(0)">About Us</a>
                            </li>
                            <li className="text-red-700 font-semibold text-base hover:text-blue-900">
                                <a href="javascript:void(0)">Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <div className="h-screen grid grid-cols-2 gap-4 place-items-center">
            <div className="px-5 ">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"/>
            </div>
            <div>
                <LoginPage/>
            </div>
        </div>
        </>
    );
}