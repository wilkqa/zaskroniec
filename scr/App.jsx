import React, { useState, useEffect } from 'react';
import { 
  App, Tabbar, TabbarLink, Toast, ActionSheet, Popup, Sheet, Button, Fab
} from 'konsta/react';

// Import pages
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import SettingsPage from './pages/SettingsPage';

// Telegram WebApp integration
const tg = window.Telegram?.WebApp;

function TelegramMiniApp() {
  const [currentView, setCurrentView] = useState('intro');
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('auto');
  const [isDark, setIsDark] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [progress, setProgress] = useState(0);

  // Initialize Telegram WebApp
  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      
      const telegramTheme = tg.colorScheme;
      setIsDark(telegramTheme === 'dark');
      
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);
      
      const handler = (e) => setIsDark(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 10);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') setIsDark(false);
    if (newTheme === 'dark') setIsDark(true);
    
    if (tg) {
      tg.setHeaderColor(newTheme === 'dark' ? '#1f2937' : '#ffffff');
    }
  };

  const handleHapticFeedback = (type = 'light') => {
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(type);
    }
  };

  const appProps = {
    currentView,
    setCurrentView,
    activeTab,
    setActiveTab,
    user,
    setUser,
    theme,
    setTheme: handleThemeChange,
    isDark,
    setIsDark,
    showToast,
    setShowToast,
    showActionSheet,
    setShowActionSheet,
    showPopup,
    setShowPopup,
    showSheet,
    setShowSheet,
    notifications,
    setNotifications,
    progress,
    tg,
    handleHapticFeedback
  };

  return (
    <App theme={isDark ? 'material' : 'ios'} dark={isDark}>
      <div className="telegram-viewport w-screen h-screen overflow-hidden">
        {currentView === 'intro' && <IntroPage {...appProps} />}
        {currentView === 'login' && <LoginPage {...appProps} />}
        {currentView === 'main' && (
          <>
            {activeTab === 'home' && <HomePage {...appProps} />}
            {activeTab === 'features' && <FeaturesPage {...appProps} />}
            {activeTab === 'settings' && <SettingsPage {...appProps} />}
            
            <Tabbar className="fixed bottom-0">
              <TabbarLink 
                active={activeTab === 'home'}
                onClick={() => {
                  setActiveTab('home');
                  handleHapticFeedback('light');
                }}
                icon="🏠"
                label="Home"
              />
              <TabbarLink 
                active={activeTab === 'features'}
                onClick={() => {
                  setActiveTab('features');
                  handleHapticFeedback('light');
                }}
                icon="⚡"
                label="Features"
              />
              <TabbarLink 
                active={activeTab === 'settings'}
                onClick={() => {
                  setActiveTab('settings');
                  handleHapticFeedback('light');
                }}
                icon="⚙️"
                label="Settings"
              />
            </Tabbar>

            <Fab 
              className="fixed bottom-20 right-4"
              onClick={() => {
                handleHapticFeedback('heavy');
                setShowToast(true);
              }}
            >
              +
            </Fab>
          </>
        )}

        {/* Modals and Overlays */}
        <Toast 
          opened={showToast}
          text="Action completed successfully!"
          onBackdropClick={() => setShowToast(false)}
        />

        <ActionSheet 
          opened={showActionSheet}
          onBackdropClick={() => setShowActionSheet(false)}
        >
          <div className="p-4">
            <Button 
              fill 
              className="mb-2"
              onClick={() => {
                setShowActionSheet(false);
                if (tg) {
                  const shareData = {
                    url: 'https://t.me/your_bot',
                    text: 'Check out this awesome Mini App!'
                  };
                  tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`);
                }
              }}
            >
              Share App
            </Button>
            <Button 
              fill 
              className="mb-2"
              onClick={() => {
                setShowActionSheet(false);
                if (tg) tg.openLink('https://telegram.org');
              }}
            >
              Open Link
            </Button>
            <Button 
              fill 
              color="red"
              onClick={() => setShowActionSheet(false)}
            >
              Cancel
            </Button>
          </div>
        </ActionSheet>

        <Popup 
          opened={showPopup}
          onBackdropClick={() => setShowPopup(false)}
        >
          <div className="p-4">
            <h3 className="font-bold mb-4">Popup Content</h3>
            <p className="mb-4">This is a popup with custom content!</p>
            <Button 
              fill 
              onClick={() => setShowPopup(false)}
            >
              Close Popup
            </Button>
          </div>
        </Popup>

        <Sheet 
          opened={showSheet}
          onBackdropClick={() => setShowSheet(false)}
        >
          <div className="p-4">
            <h3 className="font-bold mb-4">Bottom Sheet</h3>
            <p className="mb-4">This is a bottom sheet component with various options.</p>
            <Button 
              fill 
              onClick={() => setShowSheet(false)}
            >
              Close Sheet
            </Button>
          </div>
        </Sheet>
      </div>
    </App>
  );
}

export default TelegramMiniApp;
