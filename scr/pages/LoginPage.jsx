import React from 'react';
import { Page, Navbar, Card, Button, List, ListItem } from 'konsta/react';

function LoginPage({ setCurrentView, setUser, theme, setTheme, tg }) {
  const handleLogin = () => {
    const telegramUser = tg?.initDataUnsafe?.user || {
      id: 123456789,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      photo_url: 'https://via.placeholder.com/100'
    };
    
    setUser(telegramUser);
    setCurrentView('main');
    
    if (tg) {
      tg.showAlert('Welcome to our Mini App!');
    }
  };

  return (
    <Page>
      <Navbar title="Login" />
      <div className="p-6">
        <Card className="mb-6">
          <div className="p-6 text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Telegram Login</h2>
            <p className="text-gray-600 mb-6">
              Login with your Telegram account to continue
            </p>
            <Button 
              large 
              onClick={handleLogin}
              className="w-full"
            >
              Login with Telegram
            </Button>
          </div>
        </Card>
        
        <List>
          <ListItem title="Theme Settings" />
          <ListItem 
            title="Light Theme"
            after={
              <input 
                type="radio" 
                name="theme" 
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
              />
            }
            onClick={() => setTheme('light')}
          />
          <ListItem 
            title="Dark Theme"
            after={
              <input 
                type="radio" 
                name="theme" 
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
              />
            }
            onClick={() => setTheme('dark')}
          />
          <ListItem 
            title="Auto Theme"
            after={
              <input 
                type="radio" 
                name="theme" 
                checked={theme === 'auto'}
                onChange={() => setTheme('auto')}
              />
            }
            onClick={() => setTheme('auto')}
          />
        </List>
      </div>
    </Page>
  );
}

export default LoginPage;