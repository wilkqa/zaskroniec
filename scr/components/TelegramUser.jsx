import React from 'react';
import { Badge } from 'konsta/react';

function TelegramUser({ user, showBadge = true }) {
  if (!user) return null;

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
        <span className="text-white font-bold text-sm">
          {user.first_name?.[0] || 'U'}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-medium">
          {user.first_name} {user.last_name}
        </h4>
        <p className="text-sm text-gray-600">@{user.username}</p>
      </div>
      {showBadge && <Badge color="green">Online</Badge>}
    </div>
  );
}

export default TelegramUser;
