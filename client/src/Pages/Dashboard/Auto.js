import React, { useState } from "react";

const AutomationPage = () => {
  const [tasks, setTasks] = useState([
    { name: "Email Response Automation", schedule: "Daily", type: "Email", status: "Pending" },
    { name: "CRM Data Sync", schedule: "Weekly", type: "Data Processing", status: "Pending" },
    { name: "AI Chatbot Integration", schedule: "Monthly", type: "AI", status: "Pending" }
  ]);
  const [taskName, setTaskName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [taskType, setTaskType] = useState("General");
  const [logs, setLogs] = useState([]);

  const addTask = () => {
    if (taskName && schedule) {
      const newTask = { name: taskName, schedule, type: taskType, status: "Pending" };
      setTasks([...tasks, newTask]);
      setLogs([...logs, `Task '${taskName}' added with schedule '${schedule}' and type '${taskType}'`]);
      setTaskName("");
      setSchedule("");
      setTaskType("General");
    }
  };

  const runTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "Running";
    setTasks(updatedTasks);
    setLogs([...logs, `Task '${updatedTasks[index].name}' is now Running`]);
    
    setTimeout(() => {
      updatedTasks[index].status = "Completed";
      setTasks([...updatedTasks]);
      setLogs([...logs, `Task '${updatedTasks[index].name}' completed`]);
    }, 2000);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setLogs([...logs, `Task '${tasks[index].name}' deleted`]);
  };

  return (
    <div className="flex">
      {/* Left Sidebar Menu */}
      <div className="w-1/4 p-4 bg-white text-black min-h-screen shadow-lg border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Third-Party Integration</h2>
        <ul className="space-y-2">
          <li className="mb-2 p-2 text-black hover:text-blue-500 transition">
            <a href="#">Zapier</a>
          </li>
          <li className="mb-2 p-2 text-black hover:text-blue-500 transition">
            <a href="#">Make (Integromat)</a>
          </li>
          <li className="mb-2 p-2 text-black hover:text-blue-500 transition">
            <a href="#">Pabbly Connect</a>
          </li>
          <li className="mb-2 p-2 text-black hover:text-blue-500 transition">
            <a href="#">Workato</a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="p-6 w-3/4">
        <h1 className="text-2xl font-bold mb-4">Automation Tasks</h1>
        <div className="mb-6 p-4 border rounded-lg shadow">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Schedule (e.g., Daily, Weekly)"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="border p-2 rounded"
            />
            <select value={taskType} onChange={(e) => setTaskType(e.target.value)} className="border p-2 rounded">
              <option value="General">General</option>
              <option value="Email">Email</option>
              <option value="Data Processing">Data Processing</option>
              <option value="AI">AI</option>
            </select>
            <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Task Name</th>
              <th className="border p-2">Schedule</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="border p-2">{task.name}</td>
                <td className="border p-2">{task.schedule}</td>
                <td className="border p-2">{task.type}</td>
                <td className="border p-2">{task.status}</td>
                <td className="border p-2 flex gap-2">
                  {task.status === "Pending" && (
                    <button onClick={() => runTask(index)} className="bg-green-500 text-white p-2 rounded">Run</button>
                  )}
                  <button onClick={() => deleteTask(index)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Logs</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
