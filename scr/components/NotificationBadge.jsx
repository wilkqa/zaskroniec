import React from 'react';
import { Badge } from 'konsta/react';

function NotificationBadge({ count, color = 'red' }) {
  if (!count || count === 0) return null;

  return (
    <Badge color={color}>
      {count > 99 ? '99+' : count}
    </Badge>
  );
}

export default NotificationBadge;