import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface NotificationData {
  id: string;
  title: string;
  body: string;
  data?: any;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const simulateProactiveNotification = () => {
    if (Platform.OS === 'web') {
      // Web notification simulation
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('AURA-Lite Alert', {
          body: 'We detected slow internet speeds in your area. Tap to resolve.',
          icon: '/favicon.ico',
        });
      }
    } else {
      // Mobile notification simulation (would use expo-notifications in real app)
      console.log('Proactive notification triggered');
    }

    const newNotification: NotificationData = {
      id: Date.now().toString(),
      title: 'Connection Issue Detected',
      body: 'We detected slow internet speeds in your area. Tap to resolve.',
      data: { type: 'connection_issue' },
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'web') {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
    }
    return false;
  };

  useEffect(() => {
    requestPermissions();
    
    // Simulate proactive notification after 5 seconds
    const timer = setTimeout(() => {
      simulateProactiveNotification();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return {
    notifications,
    simulateProactiveNotification,
    requestPermissions,
  };
};
