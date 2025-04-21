import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context.js';
import Contacts from "../Pages/Dashboard/ContactLists.js";
import Header from './Header';
import Activity from "../Pages/Dashboard/Activity.js";
import APIIntegration from "../Pages/Dashboard/APIIntegration.js";
import Auto from "../Pages/Dashboard/Auto.js";
import Campaigns from "../Pages/Dashboard/Campaigns.js";
import Documentation from "../Pages/Dashboard/Documentation.js";
import Reports from "../Pages/Dashboard/Reports.js";
import SubUsers from "../Pages/Dashboard/SubUsers.js";
import Thirdpartyintegration from '../Pages/Thirdpartyintegration.js';
import AIWarmup from "../Pages/Dashboard/AIWarmup.js";

//react icons
import { AiFillHome } from "react-icons/ai"; 
import { MdCampaign } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri"; 
import { FiBarChart2 } from "react-icons/fi"; 
import { BsCodeSlash } from "react-icons/bs"; 
import { HiDocumentText } from "react-icons/hi"; 
import { FaUsers } from "react-icons/fa"; 
import { MdContacts } from "react-icons/md"; 
import { MdBolt } from 'react-icons/md';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = ({ setActivePage, isCollapsed, toggleCollapse }) => {
    return (
      <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-gray-100 flex flex-col transition-all duration-300 fixed z-10 border-r border-gray-200 shadow-sm`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-5">
            {!isCollapsed && <h2 className="text-xl font-bold text-gray-800">Mailspace</h2>}
            <button 
              onClick={toggleCollapse}
              className="p-1 rounded-full hover:bg-gray-200 absolute -right-3 top-5 bg-white shadow-md border border-gray-300 z-10"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          </div>
          <ul className="space-y-1">
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("Activity")}>
              <AiFillHome size={20} className="min-w-[20px]" /> 
              {!isCollapsed && <span className="whitespace-nowrap">Home</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("contacts")}>
              <MdContacts size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Contacts</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("Campaigns")}>
              <MdCampaign size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Campaigns</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("Automations")}>
              <RiRobot2Fill size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Automations</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("Reports")}>
              <FiBarChart2 size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Reports</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("API Integration")}>
              <BsCodeSlash size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">API & SMTP</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("Documentation")}>
              <HiDocumentText size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Documentation</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("SubUsers")}>
              <FaUsers size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Sub Users</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("AIWarmup")}>
              <MdBolt size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">AI Warmup</span>}
            </li>
            <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => setActivePage("Third-Party SMTP & API Integration")}>
              <FaUsers size={20} className="min-w-[20px]"/> 
              {!isCollapsed && <span className="whitespace-nowrap">Third-Party</span>}
            </li>
          </ul>
        </div>
      </div>
    );
};

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);
    const [activePage, setActivePage] = useState("Activity");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const history = useNavigate();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data);
            history("/dash");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true);
        }, 2000);
    }, []);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            <Sidebar 
                setActivePage={setActivePage} 
                isCollapsed={isCollapsed} 
                toggleCollapse={toggleCollapse}
            />
            
            {/* Main content area */}
            <div 
                className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
                style={{
                    marginLeft: isCollapsed ? '80px' : '256px',
                    width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)'
                }}
            >
                <Header />
                
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="mt-2">
                        {activePage === "Activity" && <Activity/>}
                        {activePage === "contacts" && <Contacts />}
                        {activePage === "Campaigns" && <Campaigns />}
                        {activePage === "Automations" && <Auto />}
                        {activePage === "Reports" && <Reports/>}
                        {activePage === "API Integration" && <APIIntegration />}
                        {activePage === "Documentation" && <Documentation />}
                        {activePage === "SubUsers" && <SubUsers />}
                        {activePage === "AIWarmup" && <AIWarmup />}
                        {activePage === "Third-Party SMTP & API Integration" && <Thirdpartyintegration/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;