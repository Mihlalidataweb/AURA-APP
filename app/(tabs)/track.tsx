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
import { MapPin, Clock, Phone, User, Navigation } from 'lucide-react-native';

interface TechnicianData {
  id: string;
  name: string;
  phone: string;
  eta: string;
  status: 'en_route' | 'arrived' | 'working' | 'completed';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  skills: string[];
}

export default function TrackScreen() {
  const [technician, setTechnician] = useState<TechnicianData>({
    id: 'tech-001',
    name: 'Alex Chen',
    phone: '+1 (555) 123-4567',
    eta: '15 minutes',
    status: 'en_route',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '2.3 miles away - Mission District',
    },
    skills: ['Fiber Optic', 'Router Config', 'Network Security'],
  });

  const [pulseAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );
    pulseAnimation.start();

    // Simulate technician movement
    const interval = setInterval(() => {
      setTechnician(prev => ({
        ...prev,
        eta: Math.max(1, parseInt(prev.eta) - 1) + ' minutes',
        location: {
          ...prev.location,
          address: `${Math.max(0.1, parseFloat(prev.location.address.split(' ')[0]) - 0.1).toFixed(1)} miles away - Mission District`,
        },
      }));
    }, 10000);

    return () => {
      clearInterval(interval);
      pulseAnimation.stop();
    };
  }, [pulseAnim]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route':
        return '#00ffff';
      case 'arrived':
        return '#ff0080';
      case 'working':
        return '#ffff00';
      case 'completed':
        return '#00ff00';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_route':
        return 'EN ROUTE TO YOUR LOCATION';
      case 'arrived':
        return 'ARRIVED AT YOUR LOCATION';
      case 'working':
        return 'WORKING ON YOUR ISSUE';
      case 'completed':
        return 'SERVICE COMPLETED';
      default:
        return 'STATUS UNKNOWN';
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
            <Text style={styles.headerTitle}>TECHNICIAN TRACKER</Text>
            <Text style={styles.headerSubtitle}>
              Real-time location and status updates
            </Text>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapContainer}>
            <LinearGradient
              colors={['#001a1a', '#002626', '#003333']}
              style={styles.mapGradient}
            >
              {/* Grid Pattern */}
              <View style={styles.gridPattern}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <View key={`h-${i}`} style={[styles.gridLine, { top: i * 30 }]} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <View key={`v-${i}`} style={[styles.gridLineVertical, { left: i * 40 }]} />
                ))}
              </View>

              {/* Technician Location */}
              <Animated.View
                style={[
                  styles.technicianMarker,
                  {
                    opacity: pulseAnim,
                    transform: [
                      {
                        scale: pulseAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.2],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.markerInner}>
                  <Navigation color="#ffffff" size={16} />
                </View>
              </Animated.View>

              {/* Your Location */}
              <View style={styles.yourLocation}>
                <View style={styles.yourLocationInner}>
                  <MapPin color="#ff0080" size={20} />
                </View>
                <Text style={styles.yourLocationText}>YOUR LOCATION</Text>
              </View>

              {/* Route Line */}
              <View style={styles.routeLine} />
            </LinearGradient>
          </View>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <LinearGradient
              colors={['rgba(0, 255, 255, 0.1)', 'rgba(0, 255, 255, 0.05)']}
              style={styles.statusGradient}
            >
              <View style={styles.statusHeader}>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: getStatusColor(technician.status) },
                  ]}
                />
                <Text style={styles.statusText}>
                  {getStatusText(technician.status)}
                </Text>
              </View>
              <View style={styles.etaContainer}>
                <Clock color="#00ffff" size={20} />
                <Text style={styles.etaText}>ETA: {technician.eta}</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Technician Info */}
          <View style={styles.technicianCard}>
            <LinearGradient
              colors={['#1a1a1a', '#2d2d2d']}
              style={styles.technicianGradient}
            >
              <View style={styles.technicianHeader}>
                <View style={styles.technicianAvatar}>
                  <User color="#ffffff" size={24} />
                </View>
                <View style={styles.technicianInfo}>
                  <Text style={styles.technicianName}>{technician.name}</Text>
                  <Text style={styles.technicianLocation}>
                    {technician.location.address}
                  </Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Phone color="#00ff00" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.skillsContainer}>
                <Text style={styles.skillsTitle}>SPECIALIZATIONS</Text>
                <View style={styles.skillsList}>
                  {technician.skills.map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Service Details */}
          <View style={styles.serviceCard}>
            <LinearGradient
              colors={['rgba(255, 0, 128, 0.1)', 'rgba(255, 0, 128, 0.05)']}
              style={styles.serviceGradient}
            >
              <Text style={styles.serviceTitle}>SERVICE REQUEST</Text>
              <View style={styles.serviceDetails}>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Issue Type:</Text>
                  <Text style={styles.serviceValue}>Internet Connectivity</Text>
                </View>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Priority:</Text>
                  <Text style={styles.serviceValue}>High</Text>
                </View>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Scheduled:</Text>
                  <Text style={styles.serviceValue}>Today, 2:00 PM - 4:00 PM</Text>
                </View>
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceLabel}>Service ID:</Text>
                  <Text style={styles.serviceValue}>#SR-2024-001</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#003300', '#006600']}
                style={styles.actionGradient}
              >
                <Phone color="#00ff00" size={20} />
                <Text style={styles.actionText}>CALL TECHNICIAN</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={['#330033', '#660066']}
                style={styles.actionGradient}
              >
                <Text style={styles.actionText}>RESCHEDULE</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingVertical: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  mapContainer: {
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  mapGradient: {
    flex: 1,
    position: 'relative',
  },
  gridPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  technicianMarker: {
    position: 'absolute',
    top: 60,
    left: 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  markerInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#003333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourLocation: {
    position: 'absolute',
    bottom: 40,
    right: 60,
    alignItems: 'center',
  },
  yourLocationInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff0080',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff0080',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  yourLocationText: {
    fontSize: 8,
    color: '#ff0080',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  routeLine: {
    position: 'absolute',
    top: 80,
    left: 100,
    width: 120,
    height: 2,
    backgroundColor: '#00ffff',
    transform: [{ rotate: '45deg' }],
    opacity: 0.6,
  },
  statusCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  statusGradient: {
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 18,
    color: '#00ffff',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  technicianCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  technicianGradient: {
    padding: 20,
  },
  technicianHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  technicianAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  technicianInfo: {
    flex: 1,
    marginLeft: 12,
  },
  technicianName: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  technicianLocation: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 2,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  skillsContainer: {
    marginTop: 16,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#00ffff',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  skillText: {
    fontSize: 10,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  serviceCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ff0080',
  },
  serviceGradient: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#ff0080',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  serviceDetails: {
    gap: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceLabel: {
    fontSize: 14,
    color: '#cccccc',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  serviceValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold' as const,
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  actionGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});
