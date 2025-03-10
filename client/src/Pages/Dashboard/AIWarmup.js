import React, { useState, useEffect } from 'react';
import { 
  SparklesIcon, 
  ChartBarIcon, 
  CalendarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const AIWarmup = () => {
  const [warmupSchedule, setWarmupSchedule] = useState([
    { day: 1, emails: 50, status: 'completed' },
    { day: 2, emails: 75, status: 'completed' },
    { day: 3, emails: 100, status: 'active' },
    { day: 4, emails: 150, status: 'pending' },
  ]);

  const [settings, setSettings] = useState({
    dailyLimit: 100,
    aiOptimization: true,
    spamCheck: true
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-purple-600" />
          AI Domain Warmup
        </h1>
        <div className="flex items-center gap-4">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Active Warming
          </span>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Sender Score</h3>
              <p className="text-2xl font-bold">84/100</p>
              <span className="text-green-600 text-sm">↑ 12% this week</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Daily Emails</h3>
              <p className="text-2xl font-bold">{settings.dailyLimit}</p>
              <span className="text-gray-500 text-sm">AI Recommended</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Spam Rate</h3>
              <p className="text-2xl font-bold">0.2%</p>
              <span className="text-green-600 text-sm">↓ 0.8% from start</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warmup Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            Warmup Progress
          </h2>
          <span className="text-sm text-gray-500">Phase 2 of 4</span>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full mb-4">
          <div 
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: '45%' }}
          ></div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          {['Foundation', 'Growth', 'Consolidation', 'Full Capacity'].map((stage, index) => (
            <div key={stage} className={`${index < 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              {stage}
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Warmup Schedule</h3>
          <div className="space-y-4">
            {warmupSchedule.map((day) => (
              <div 
                key={day.day}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span>Day {day.day}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{day.emails} emails</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    day.status === 'completed' ? 'bg-green-100 text-green-800' :
                    day.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {day.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">AI Optimization</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Email Limit</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={settings.dailyLimit}
                  onChange={(e) => setSettings({ ...settings, dailyLimit: e.target.value })}
                  className="w-full"
                />
                <span className="w-20 px-3 py-2 border rounded-md">
                  {settings.dailyLimit}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={settings.aiOptimization}
                  onChange={(e) => setSettings({ ...settings, aiOptimization: e.target.checked })}
                  className="h-4 w-4"
                />
                <span className="text-sm">Enable AI Optimization</span>
              </div>
              
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={settings.spamCheck}
                  onChange={(e) => setSettings({ ...settings, spamCheck: e.target.checked })}
                  className="h-4 w-4"
                />
                <span className="text-sm">Real-time Spam Check</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWarmup;