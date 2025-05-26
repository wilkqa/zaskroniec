import React from 'react';
import { Toggle } from 'konsta/react';

function ThemeToggle({ theme, isDark, onThemeChange }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span>Dark Mode</span>
      <Toggle 
        checked={isDark}
        onChange={() => onThemeChange(isDark ? 'light' : 'dark')}
      />
    </div>
  );
}

export default ThemeToggle;