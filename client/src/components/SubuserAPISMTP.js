import React, { useState } from "react";
import { FaUsers, FaUserPlus, FaTrash, FaEdit, FaCoins, FaPlug } from "react-icons/fa";

const APISMTP = ({ isMasterUser }) => {
  const [subUsers, setSubUsers] = useState([
    { 
      id: 1, name: "John Doe", role: "Admin", email: "john@example.com", contact: "9876543210",
      permissions: {
        viewReports: true, sendCampaigns: true, uploadContacts: true, changeAPI: true,
        downloadReports: false, downloadContacts: false, modifyContacts: true,
        activateUser: true
      }, credits: 100, active: true
    },
  ]);
  
  const [smtpConfig, setSmtpConfig] = useState({ host: "", port: "", username: "", password: "" });
  const [apiConfig, setApiConfig] = useState({ apiKey: "", apiSecret: "" });
  const [testResult, setTestResult] = useState("");

  // Handle SMTP & API config changes
  const handleSmtpChange = (e) => {
    setSmtpConfig({ ...smtpConfig, [e.target.name]: e.target.value });
  };

  const handleApiChange = (e) => {
    setApiConfig({ ...apiConfig, [e.target.name]: e.target.value });
  };

  // Test SMTP & API Configuration
  const testIntegration = () => {
    let result = "";
    if (smtpConfig.host && smtpConfig.port && smtpConfig.username && smtpConfig.password) {
      result += "SMTP Connection Successful! ";
    } else {
      result += "SMTP Configuration Incomplete ";
    }

    if (apiConfig.apiKey && apiConfig.apiSecret) {
      result += "| API Connection Successful!";
    } else {
      result += "| API Configuration Incomplete";
    }
    setTestResult(result);
  };

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold flex items-center gap-2">
     //<FaUsers size={28} className="text-blue-500" /> Sub Users Management
      </h1> */}
      
      {/* Third-Party Integration */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaPlug className="text-green-500" /> Third-Party SMTP & API Integration
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* SMTP Configuration */}
          <div>
            <h3 className="text-md font-semibold">SMTP Configuration</h3>
            <input type="text" name="host" value={smtpConfig.host} onChange={handleSmtpChange} placeholder="SMTP Host" className="border p-2 w-full rounded mt-2" />
            <input type="text" name="port" value={smtpConfig.port} onChange={handleSmtpChange} placeholder="SMTP Port" className="border p-2 w-full rounded mt-2" />
            <input type="text" name="username" value={smtpConfig.username} onChange={handleSmtpChange} placeholder="Username" className="border p-2 w-full rounded mt-2" />
            <input type="password" name="password" value={smtpConfig.password} onChange={handleSmtpChange} placeholder="Password" className="border p-2 w-full rounded mt-2" />
          </div>

          {/* API Configuration */}
          <div>
            <h3 className="text-md font-semibold">API Configuration</h3>
            <input type="text" name="apiKey" value={apiConfig.apiKey} onChange={handleApiChange} placeholder="API Key" className="border p-2 w-full rounded mt-2" />
            <input type="text" name="apiSecret" value={apiConfig.apiSecret} onChange={handleApiChange} placeholder="API Secret" className="border p-2 w-full rounded mt-2" />
          </div>
        </div>

        <button onClick={testIntegration} className="bg-blue-500 text-white px-3 py-2 rounded-md mt-4">Test Integration</button>
        <p className="mt-2 text-gray-700">{testResult}</p>
      </div>
    </div>
  );
};

export default APISMTP;
