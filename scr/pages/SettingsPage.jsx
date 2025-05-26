import React from 'react';
import { Page, Navbar, List, ListItem, Toggle } from 'konsta/react';

function SettingsPage({ 
  user, 
  isDark, 
  theme, 
  setTheme, 
  setCurrentView, 
  setUser, 
  tg 
}) {
  return (
    <Page>
      <Navbar title="Settings" />
      <div className="p-4">
        <List>
          <ListItem title="Theme Settings" />
          <ListItem 
            title="Dark Mode"
            after={
              <Toggle 
                checked={isDark}
                onChange={() => setTheme(isDark ? 'light' : 'dark')}
              />
            }
          />
          <ListItem 
            title="Auto Theme"
            after={
              <Toggle 
                checked={theme === 'auto'}
                onChange={() => setTheme(theme === 'auto' ? 'light' : 'auto')}
              />
            }
          />
        </List>

        <List>
          <ListItem title="Account" />
          <ListItem 
            title="Profile"
            subtitle={`${user?.first_name || 'User'} ${user?.last_name || ''}`}
            after="→"
          />
          <ListItem 
            title="Privacy"
            after="→"
          />
          <ListItem 
            title="Notifications"
            after="→"
          />
        </List>

        <List>
          <ListItem title="About" />
          <ListItem 
            title="Version"
            after="1.0.0"
          />
          <ListItem 
            title="Help & Support"
            after="→"
          />
          <ListItem 
            title="Logout"
            onClick={() => {
              if (tg) {
                tg.showConfirm('Are you sure you want to logout?', (confirmed) => {
                  if (confirmed) {
                    setCurrentView('intro');
                    setUser(null);
                  }
                });
              }
            }}
            className="text-red-500"
          />
        </List>
      </div>
    </Page>
  );
}

export default SettingsPage;
