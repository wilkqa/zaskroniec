==== src/pages/FeaturesPage.jsx ====
import React from 'react';
import { 
  Page, Navbar, Card, Button, List, ListItem, Chip, Toggle, Range, Stepper 
} from 'konsta/react';

function FeaturesPage({ handleHapticFeedback, setShowToast, setShowSheet, tg }) {
  const handlePayment = () => {
    if (tg) {
      tg.showAlert('Payment feature would be integrated here with Telegram Payments API');
    }
  };

  return (
    <Page>
      <Navbar title="Features" />
      <div className="p-4">
        <Card className="mb-4">
          <div className="p-4">
            <h3 className="font-bold mb-4">Telegram Integrations</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                fill 
                small
                onClick={() => {
                  handleHapticFeedback('heavy');
                  if (tg) tg.showAlert('Haptic feedback triggered!');
                }}
              >
                Haptic
              </Button>
              <Button 
                fill 
                small
                onClick={handlePayment}
              >
                Payment
              </Button>
              <Button 
                fill 
                small
                onClick={() => {
                  if (tg) tg.showConfirm('Are you sure?', (confirmed) => {
                    if (confirmed) setShowToast(true);
                  });
                }}
              >
                Confirm
              </Button>
              <Button 
                fill 
                small
                onClick={() => setShowSheet(true)}
              >
                Sheet
              </Button>
            </div>
          </div>
        </Card>

        <List>
          <ListItem title="UI Components" />
          <ListItem 
            title="Chips Demo"
            subtitle={
              <div className="flex gap-2 mt-2">
                <Chip>Tag 1</Chip>
                <Chip color="red">Tag 2</Chip>
                <Chip color="green">Tag 3</Chip>
              </div>
            }
          />
          <ListItem 
            title="Toggle Switch"
            after={<Toggle />}
          />
          <ListItem 
            title="Range Slider"
            subtitle={<Range className="mt-2" />}
          />
          <ListItem 
            title="Stepper"
            after={<Stepper />}
          />
        </List>
      </div>
    </Page>
  );
}

export default FeaturesPage;