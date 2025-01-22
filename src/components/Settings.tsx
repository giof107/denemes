import React from 'react';
import { useRaffleStore } from '../store/raffleStore';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useRaffleStore();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
        <SettingsIcon className="mr-2" />
        Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Animation Type
          </label>
          <select
            value={settings.animationType}
            onChange={(e) => updateSettings({ animationType: e.target.value as 'matrix' | 'particles' | 'glitch' })}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="matrix">Matrix Rain</option>
            <option value="particles">Particles</option>
            <option value="glitch">Glitch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Drawing Method
          </label>
          <select
            value={settings.drawingMethod}
            onChange={(e) => updateSettings({ drawingMethod: e.target.value as 'random' | 'weighted' })}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="random">Random</option>
            <option value="weighted">Weighted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Winners
          </label>
          <input
            type="number"
            min="1"
            value={settings.winnerCount}
            onChange={(e) => updateSettings({ winnerCount: parseInt(e.target.value) })}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Animation Duration (ms)
          </label>
          <input
            type="range"
            min="1000"
            max="5000"
            step="500"
            value={settings.animationDuration}
            onChange={(e) => updateSettings({ animationDuration: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
            className="rounded"
          />
          <label className="text-sm font-medium text-gray-300">
            Enable Sound Effects
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Theme
          </label>
          <select
            value={settings.theme}
            onChange={(e) => updateSettings({ theme: e.target.value as 'dark' | 'light' | 'matrix' })}
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="matrix">Matrix</option>
          </select>
        </div>
      </div>
    </div>
  );
};