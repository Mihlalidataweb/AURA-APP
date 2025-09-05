import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Circle, ArrowRight, MessageCircle } from 'lucide-react-native';
import { router } from 'expo-router';

interface HelpStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface HelpGuide {
  id: string;
  title: string;
  description: string;
  steps: HelpStep[];
}

export default function HelpScreen() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [guides, setGuides] = useState<HelpGuide[]>([
    {
      id: 'slow-internet',
      title: 'SLOW INTERNET SPEED',
      description: 'Diagnose and fix connection speed issues',
      steps: [
        {
          id: '1',
          title: 'Check Device Connection',
          description: 'Ensure your device is connected to the correct network',
          completed: false,
        },
        {
          id: '2',
          title: 'Restart Router',
          description: 'Unplug router for 30 seconds, then plug back in',
          completed: false,
        },
        {
          id: '3',
          title: 'Run Speed Test',
          description: 'Test your connection speed using our diagnostic tool',
          completed: false,
        },
        {
          id: '4',
          title: 'Check for Interference',
          description: 'Move closer to router and remove obstacles',
          completed: false,
        },
      ],
    },
    {
      id: 'no-connection',
      title: 'NO INTERNET CONNECTION',
      description: 'Restore your internet connection',
      steps: [
        {
          id: '1',
          title: 'Check Cable Connections',
          description: 'Ensure all cables are securely connected',
          completed: false,
        },
        {
          id: '2',
          title: 'Power Cycle Equipment',
          description: 'Restart modem and router in correct order',
          completed: false,
        },
        {
          id: '3',
          title: 'Check Service Status',
          description: 'Verify if there are any outages in your area',
          completed: false,
        },
      ],
    },
    {
      id: 'wifi-issues',
      title: 'WIFI CONNECTION PROBLEMS',
      description: 'Fix wireless connectivity issues',
      steps: [
        {
          id: '1',
          title: 'Forget and Reconnect',
          description: 'Remove WiFi network and reconnect with password',
          completed: false,
        },
        {
          id: '2',
          title: 'Update Network Drivers',
          description: 'Ensure your device drivers are up to date',
          completed: false,
        },
        {
          id: '3',
          title: 'Change WiFi Channel',
          description: 'Switch to a less congested channel',
          completed: false,
        },
      ],
    },
  ]);

  const toggleStep = (guideId: string, stepId: string) => {
    setGuides(prevGuides =>
      prevGuides.map(guide =>
        guide.id === guideId
          ? {
              ...guide,
              steps: guide.steps.map(step =>
                step.id === stepId
                  ? { ...step, completed: !step.completed }
                  : step
              ),
            }
          : guide
      )
    );
  };

  const getCompletedSteps = (guide: HelpGuide) => {
    return guide.steps.filter(step => step.completed).length;
  };

  const isGuideCompleted = (guide: HelpGuide) => {
    return guide.steps.every(step => step.completed);
  };

  const selectedGuideData = guides.find(guide => guide.id === selectedGuide);

  if (selectedGuide && selectedGuideData) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#000000', '#0a0a0a', '#111111']}
          style={styles.gradient}
        >
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedGuide(null)}
              >
                <Text style={styles.backText}>← BACK</Text>
              </TouchableOpacity>
              <Text style={styles.guideTitle}>{selectedGuideData.title}</Text>
              <Text style={styles.guideDescription}>
                {selectedGuideData.description}
              </Text>
            </View>

            {/* Progress */}
            <View style={styles.progressCard}>
              <LinearGradient
                colors={['#001a1a', '#002626']}
                style={styles.progressGradient}
              >
                <Text style={styles.progressTitle}>PROGRESS</Text>
                <Text style={styles.progressText}>
                  {getCompletedSteps(selectedGuideData)} of {selectedGuideData.steps.length} steps completed
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(getCompletedSteps(selectedGuideData) / selectedGuideData.steps.length) * 100}%`,
                      },
                    ]}
                  />
                </View>
              </LinearGradient>
            </View>

            {/* Steps */}
            <View style={styles.stepsContainer}>
              {selectedGuideData.steps.map((step, index) => (
                <TouchableOpacity
                  key={step.id}
                  style={[
                    styles.stepCard,
                    step.completed && styles.stepCompleted,
                  ]}
                  onPress={() => toggleStep(selectedGuideData.id, step.id)}
                >
                  <View style={styles.stepHeader}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.stepContent}>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDescription}>
                        {step.description}
                      </Text>
                    </View>
                    <View style={styles.stepIcon}>
                      {step.completed ? (
                        <CheckCircle color="#00ff00" size={24} />
                      ) : (
                        <Circle color="#666666" size={24} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {isGuideCompleted(selectedGuideData) ? (
                <TouchableOpacity
                  style={styles.successButton}
                  onPress={() => setSelectedGuide(null)}
                >
                  <LinearGradient
                    colors={['#003300', '#006600']}
                    style={styles.buttonGradient}
                  >
                    <CheckCircle color="#00ff00" size={20} />
                    <Text style={styles.buttonText}>ISSUE RESOLVED</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.helpButton}
                  onPress={() => router.push('/chat')}
                >
                  <LinearGradient
                    colors={['#330033', '#660066']}
                    style={styles.buttonGradient}
                  >
                    <MessageCircle color="#ff0080" size={20} />
                    <Text style={styles.buttonText}>STILL NEED HELP?</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0a0a0a', '#111111']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SELF-HELP GUIDES</Text>
            <Text style={styles.headerSubtitle}>
              Select an issue to start troubleshooting
            </Text>
          </View>

          {/* Guides List */}
          <View style={styles.guidesContainer}>
            {guides.map((guide) => (
              <TouchableOpacity
                key={guide.id}
                style={styles.guideCard}
                onPress={() => setSelectedGuide(guide.id)}
              >
                <LinearGradient
                  colors={['rgba(0, 255, 255, 0.1)', 'rgba(0, 255, 255, 0.05)']}
                  style={styles.guideGradient}
                >
                  <View style={styles.guideHeader}>
                    <Text style={styles.guideCardTitle}>{guide.title}</Text>
                    <ArrowRight color="#00ffff" size={20} />
                  </View>
                  <Text style={styles.guideCardDescription}>
                    {guide.description}
                  </Text>
                  <Text style={styles.guideSteps}>
                    {guide.steps.length} steps
                  </Text>
                </LinearGradient>
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
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textAlign: 'center',
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
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: 8,
  },
  guideDescription: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 22,
  },
  progressCard: {
    marginBottom: 30,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  progressGradient: {
    padding: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ffff',
    borderRadius: 3,
  },
  guidesContainer: {
    marginBottom: 30,
  },
  guideCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  guideGradient: {
    padding: 20,
  },
  guideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  guideCardTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  guideCardDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 8,
  },
  guideSteps: {
    fontSize: 12,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stepCompleted: {
    borderColor: '#00ff00',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  stepDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 18,
  },
  stepIcon: {
    marginLeft: 12,
  },
  actionButtons: {
    marginBottom: 30,
  },
  successButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ff00',
  },
  helpButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ff0080',
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});
