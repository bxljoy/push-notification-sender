"use client"

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Notification = {
  id: string;
  title: string;
  message: string;
  platform: string;
  sentAt: string;
};

export default function NotificationHistory() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const mockNotifications: Notification[] = [
      { id: '1', title: 'Welcome', message: 'Welcome to our app!', platform: 'both', sentAt: '2023-05-20T10:00:00Z' },
      { id: '2', title: 'New Feature', message: 'Check out our new feature!', platform: 'ios', sentAt: '2023-05-21T14:30:00Z' },
      { id: '3', title: 'Update Available', message: 'A new update is available', platform: 'android', sentAt: '2023-05-22T09:15:00Z' },
    ];
    setNotifications(mockNotifications);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Sent At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications.map((notification) => (
          <TableRow key={notification.id}>
            <TableCell>{notification.title}</TableCell>
            <TableCell>{notification.message}</TableCell>
            <TableCell>{notification.platform}</TableCell>
            <TableCell>{new Date(notification.sentAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}