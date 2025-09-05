import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Wifi, AlertTriangle, CheckCircle, Zap, HelpCircle, MessageCircle, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

interface NotificationItem {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
}

export default function DashboardScreen() {
  const [notifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Connection Issue Detected',
      message: 'We detected slow internet speeds in your area. Tap to resolve.',
      timestamp: '2 min ago'
    },
    {
      id: '2',
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Network maintenance planned for tonight 2-4 AM.',
      timestamp: '1 hour ago'
    }
  ]);

  const [glowAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    glowAnimation.start();
  }, [glowAnim]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle color="#ff0080" size={24} />;
      case 'success':
        return <CheckCircle color="#00ff00" size={24} />;
      default:
        return <Zap color="#00ffff" size={24} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return '#ff0080';
      case 'success':
        return '#00ff00';
      default:
        return '#00ffff';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0a0a0a', '#111111']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>AURA-LITE</Text>
            <Text style={styles.headerSubtitle}>TELECOM COMMAND CENTER</Text>
          </View>

          {/* Connection Status */}
          <View style={styles.statusCard}>
            <LinearGradient
              colors={['#001a1a', '#002626']}
              style={styles.statusGradient}
            >
              <View style={styles.statusHeader}>
                <Wifi color="#00ffff" size={32} />
                <Text style={styles.statusTitle}>CONNECTION STATUS</Text>
              </View>
              <Animated.View
                style={[
                  styles.statusIndicator,
                  {
                    shadowOpacity: glowAnim,
                  }
                ]}
              >
                <Text style={styles.statusValue}>ACTIVE</Text>
                <Text style={styles.statusSpeed}>85.2 Mbps</Text>
              </Animated.View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/help')}
              >
                <LinearGradient
                  colors={['#1a0033', '#330066']}
                  style={styles.actionGradient}
                >
                  <HelpCircle color="#ff0080" size={28} />
                  <Text style={styles.actionText}>SELF-HELP</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/chat')}
              >
                <LinearGradient
                  colors={['#001a33', '#003366']}
                  style={styles.actionGradient}
                >
                  <MessageCircle color="#00ffff" size={28} />
                  <Text style={styles.actionText}>AI SUPPORT</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/track')}
              >
                <LinearGradient
                  colors={['#1a3300', '#336600']}
                  style={styles.actionGradient}
                >
                  <MapPin color="#00ff00" size={28} />
                  <Text style={styles.actionText}>TECH TRACK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.notifications}>
            <Text style={styles.sectionTitle}>SYSTEM ALERTS</Text>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  { borderColor: getNotificationColor(notification.type) }
                ]}
                onPress={() => router.push('/help')}
              >
                <View style={styles.notificationHeader}>
                  {getNotificationIcon(notification.type)}
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.timestamp}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    letterSpacing: 2,
    marginTop: 5,
  },
  statusCard: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  statusGradient: {
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#00ffff',
    marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  statusIndicator: {
    alignItems: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#00ff00',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  statusSpeed: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  quickActions: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    letterSpacing: 1,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionText: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textAlign: 'center',
  },
  notifications: {
    marginBottom: 30,
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  notificationMessage: {
    fontSize: 12,
    color: '#cccccc',
    lineHeight: 16,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 10,
    color: '#666666',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});
