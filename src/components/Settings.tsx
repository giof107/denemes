import React from 'react';
import { useRaffleStore } from '../store/raffleStore';
import { Settings as SettingsIcon } from '@lucide/react';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useRaffleStore();

  return (
    <div className="bg-[#151F2E] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
        <SettingsIcon className="mr-2" />
        Options
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Keyword
          </label>
          <input
            type="text"
            value={settings.keyword}
            onChange={(e) => updateSettings({ keyword: e.target.value })}
            className="w-full bg-[#1A2634] text-white rounded-lg p-2 border border-[#243447]"
            placeholder="e.g. !join"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Animation Type
          </label>
          <select
            value={settings.animationType}
            onChange={(e) => updateSettings({ animationType: e.target.value as 'matrix' | 'particles' | 'glitch' })}
            className="w-full bg-[#1A2634] text-white rounded-lg p-2 border border-[#243447]"
          >
            <option value="matrix">Matrix Rain</option>
            <option value="particles">Particles</option>
            <option value="glitch">Glitch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <select
            value={settings.language || 'en'}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="w-full bg-[#1A2634] text-white rounded-lg p-2 border border-[#243447]"
          >
            <option value="en">English</option>
            <option value="tr">Turkish</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Required Roles
          </label>
          <div className="flex flex-wrap gap-2">
            {['Mod', 'VIP', 'OG', 'Sub', 'Follower'].map((role) => (
              <button
                key={role}
                className={`px-3 py-1 rounded ${
                  settings.eligibilityRules.roles.includes(role)
                    ? 'bg-green-600 text-white'
                    : 'bg-[#1A2634] text-gray-400'
                }`}
                onClick={() => {
                  const newRoles = settings.eligibilityRules.roles.includes(role)
                    ? settings.eligibilityRules.roles.filter((r) => r !== role)
                    : [...settings.eligibilityRules.roles, role];
                  updateSettings({
                    eligibilityRules: { ...settings.eligibilityRules, roles: newRoles },
                  });
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Subscriber Months
          </label>
          <input
            type="number"
            min="0"
            value={settings.eligibilityRules.minSubMonths}
            onChange={(e) => updateSettings({
              eligibilityRules: {
                ...settings.eligibilityRules,
                minSubMonths: parseInt(e.target.value)
              }
            })}
            className="w-full bg-[#1A2634] text-white rounded-lg p-2 border border-[#243447]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minimum Follow Months
          </label>
          <input
            type="number"
            min="0"
            value={settings.eligibilityRules.minFollowAge}
            onChange={(e) => updateSettings({
              eligibilityRules: {
                ...settings.eligibilityRules,
                minFollowAge: parseInt(e.target.value)
              }
            })}
            className="w-full bg-[#1A2634] text-white rounded-lg p-2 border border-[#243447]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Subscriber Luck
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={settings.subscriberLuck || 1}
            onChange={(e) => updateSettings({ subscriberLuck: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="text-xs text-gray-400 mt-1">
            subscribers get {settings.subscriberLuck || 1} entries
          </div>
        </div>
      </div>
    </div>
  );
};