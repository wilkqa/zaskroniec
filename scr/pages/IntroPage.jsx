import React from 'react';
import { Page, Button } from 'konsta/react';

function IntroPage({ setCurrentView }) {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-8">
          <span className="text-4xl">🚀</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome to Mini App</h1>
        <p className="text-gray-600 mb-8 max-w-sm">
          Experience the future of Telegram Mini Apps with modern UI and seamless integrations.
        </p>
        <Button 
          large 
          onClick={() => setCurrentView('login')}
          className="w-full max-w-xs"
        >
          Get Started
        </Button>
      </div>
    </Page>
  );
}

export default IntroPage;