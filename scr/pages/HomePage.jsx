import React from 'react';
import { Page, Navbar, Card, Button, List, ListItem, Badge, Block, Progressbar } from 'konsta/react';

function HomePage({ 
  user, 
  handleHapticFeedback, 
  setShowToast, 
  notifications, 
  setNotifications, 
  setShowActionSheet, 
  setShowPopup, 
  progress, 
  tg 
}) {
  const handleShare = () => {
    if (tg) {
      const shareData = {
        url: 'https://t.me/your_bot',
        text: 'Check out this awesome Mini App!'
      };
      tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`);
    }
  };

  return (
    <Page>
      <Navbar title="Home" />
      <div className="p-4">
        <Card className="mb-4">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">
                  {user?.first_name?.[0] || 'U'}
                </span>
              </div>
              <div>
                <h3 className="font-bold">
                  {user?.first_name || 'User'} {user?.last_name || ''}
                </h3>
                <p className="text-gray-600">@{user?.username || 'username'}</p>
              </div>
              <Badge color="green" className="ml-auto">Online</Badge>
            </div>
            <Button 
              fill 
              onClick={() => {
                handleHapticFeedback('medium');
                setShowToast(true);
              }}
            >
              Show Toast
            </Button>
          </div>
        </Card>

        <List>
          <ListItem 
            title="Share App" 
            after="→"
            onClick={() => {
              handleHapticFeedback();
              handleShare();
            }}
          />
          <ListItem 
            title="Notifications" 
            after={notifications > 0 ? <Badge color="red">{notifications}</Badge> : null}
            onClick={() => {
              handleHapticFeedback();
              setNotifications(0);
            }}
          />
          <ListItem 
            title="Show Action Sheet" 
            onClick={() => {
              handleHapticFeedback();
              setShowActionSheet(true);
            }}
          />
          <ListItem 
            title="Show Popup" 
            onClick={() => {
              handleHapticFeedback();
              setShowPopup(true);
            }}
          />
        </List>

        <Block>
          <p className="mb-2">Progress Demo: {progress}%</p>
          <Progressbar progress={progress} />
        </Block>
      </div>
    </Page>
  );
}

export default HomePage;

