import React, { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  GlobeAltIcon,
  ClockIcon,
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

const data = [
  { name: "Mon", requests: 1400, delivered: 1200, opened: 900 },
  { name: "Tue", requests: 1300, delivered: 1100, opened: 800 },
  { name: "Wed", requests: 1200, delivered: 1000, opened: 750 },
  { name: "Thu", requests: 1100, delivered: 900, opened: 700 },
  { name: "Fri", requests: 1000, delivered: 850, opened: 650 },
  { name: "Sat", requests: 900, delivered: 800, opened: 600 },
  { name: "Sun", requests: 800, delivered: 700, opened: 500 },
];

const Activity = () => {
  // Email Activity States
  const [selected, setSelected] = useState("Week");
  const [domainStatus] = useState([
    { type: 'SPF', status: 'valid', lastChecked: '2 min ago' },
    { type: 'DKIM', status: 'valid', lastChecked: '2 min ago' },
    { type: 'DMARC', status: 'warning', lastChecked: '5 min ago' },
    { type: 'SSL', status: 'valid', lastChecked: '10 min ago' },
    { type: 'Blacklist', status: 'clear', lastChecked: '15 min ago' },
    { type: 'MX Records', status: 'active', lastChecked: '20 min ago' },
  ]);

  // Domain Management States
  const [domains, setDomains] = useState([
    {
      id: 1,
      name: "example.com",
      verified: true,
      dnsRecords: [
        { type: "MX", value: "mail.example.com", priority: 10 },
        { type: "TXT", value: "v=spf1 include:_spf.example.com ~all" },
        { type: "DKIM", value: "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..." },
      ]
    }
  ]);
  const [newDomain, setNewDomain] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [expandedDomain, setExpandedDomain] = useState(null);

  const stats = [
    { label: "Requests", value: "5,701", trend: 2.4 },
    { label: "Delivered", value: "95.58%", trend: 0.8 },
    { label: "Opened", value: "64.32%", trend: -1.2 },
    { label: "Clicked", value: "17.86%", trend: 3.1 },
    { label: "Bounces", value: "0.39%", trend: -0.2 },
    { label: "Spam Reports", value: "0.00%", trend: 0.0 },
  ];

  // Domain Management Functions
  const handleAddDomain = () => {
    if (!newDomain) {
      setError("Please enter a domain name");
      return;
    }
    
    if (domains.some(d => d.name === newDomain)) {
      setError("Domain already exists");
      return;
    }

    setDomains([...domains, {
      id: Date.now(),
      name: newDomain,
      verified: false,
      dnsRecords: []
    }]);
    setNewDomain("");
    setShowAddForm(false);
    setError("");
  };

  const handleDeleteDomain = (domainId) => {
    setDomains(domains.filter(d => d.id !== domainId));
  };

  const toggleDNSRecords = (domainId) => {
    setExpandedDomain(expandedDomain === domainId ? null : domainId);
  };

  // Domain Status Card Component
  const DomainStatusCard = ({ type, status, lastChecked }) => {
    const statusColors = {
      valid: 'bg-green-500',
      warning: 'bg-yellow-500',
      invalid: 'bg-red-500',
      clear: 'bg-green-500',
      active: 'bg-blue-500'
    };

    const icons = {
      SPF: <ShieldCheckIcon className="h-6 w-6 text-blue-500" />,
      DKIM: <LockClosedIcon className="h-6 w-6 text-purple-500" />,
      DMARC: <GlobeAltIcon className="h-6 w-6 text-green-500" />,
      SSL: <LockClosedIcon className="h-6 w-6 text-yellow-500" />,
      Blacklist: <ShieldCheckIcon className="h-6 w-6 text-red-500" />,
      'MX Records': <GlobeAltIcon className="h-6 w-6 text-indigo-500" />
    };

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icons[type]}
            <div>
              <h3 className="font-medium text-gray-800">{type}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {lastChecked}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <span className="text-sm capitalize text-gray-600">{status}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Email Activity Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Email Performance Dashboard
            </h1>
            <div className="flex gap-2">
              {["Week", "Month", "Year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelected(range)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selected === range
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-500 font-medium mb-1">
                  {stat.label}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                  {stat.trend !== 0 && (
                    <span
                      className={`flex items-center text-sm ${
                        stat.trend > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend > 0 ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(stat.trend)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Engagement Overview
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    tick={{ fill: "#6b7280" }}
                  />
                  <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      background: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="delivered"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="opened"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Domain Health Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Domain Health Status
            </h2>
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
              <ArrowPathIcon className="h-4 w-4" />
              Refresh Status
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domainStatus.map((status, index) => (
              <DomainStatusCard
                key={index}
                type={status.type}
                status={status.status}
                lastChecked={status.lastChecked}
              />
            ))}
          </div>
        </div>

        {/* Domain Management Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold text-gray-800">Managed Domains</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
              Add Domain
            </button>
          </div>

          {showAddForm && (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    placeholder="Enter domain name (e.g., example.com)"
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button
                    onClick={handleAddDomain}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add Domain
                  </button>
                </div>
                {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
              </div>
            </div>
          )}

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Domain</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">DNS Records</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {domains.map((domain) => (
                <React.Fragment key={domain.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4" onClick={() => toggleDNSRecords(domain.id)}>
                      <div className="flex items-center gap-2">
                        <GlobeAltIcon className="h-5 w-5 text-blue-600" />
                        {domain.name}
                        {expandedDomain === domain.id ? (
                          <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {domain.verified ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircleIcon className="h-5 w-5" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600">
                          <XCircleIcon className="h-5 w-5" />
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {domain.dnsRecords.map((record, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {record.type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteDomain(domain.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <TrashIcon className="h-5 w-5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedDomain === domain.id && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 bg-gray-50">
                        <div className="ml-8">
                          <h4 className="font-medium mb-2">DNS Records</h4>
                          <div className="space-y-3">
                            {domain.dnsRecords.length > 0 ? (
                              domain.dnsRecords.map((record, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <label className="text-sm text-gray-500">Type</label>
                                      <p className="font-medium">{record.type}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm text-gray-500">Value</label>
                                      <p className="font-mono text-sm break-all">{record.value}</p>
                                    </div>
                                    {record.priority && (
                                      <div>
                                        <label className="text-sm text-gray-500">Priority</label>
                                        <p>{record.priority}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No DNS records found</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activity;