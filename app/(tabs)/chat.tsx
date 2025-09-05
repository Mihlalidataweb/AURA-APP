import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Bot, User } from 'lucide-react-native';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m AURA, your AI technical support assistant. I can help you troubleshoot internet issues, check your connection status, and guide you through solutions. What seems to be the problem?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const botResponses: { [key: string]: string } = {
    'slow': 'I see you\'re experiencing slow internet speeds. Let me help you with that. First, can you tell me what speed you\'re currently getting? You can run a speed test to check.',
    'speed': 'For speed issues, try these steps: 1) Restart your router by unplugging it for 30 seconds, 2) Move closer to your router, 3) Check if other devices are using bandwidth. What\'s your current speed?',
    'connection': 'Connection problems can be frustrating. Let\'s check: 1) Are all cables securely connected? 2) Is your router powered on? 3) Can you see your WiFi network in available networks?',
    'wifi': 'WiFi issues are common. Try: 1) Forget and reconnect to your network, 2) Restart your device\'s WiFi, 3) Check if you\'re using the correct password. Are you able to see your network?',
    'outage': 'Let me check for any service outages in your area. Based on our current data, there are no reported outages. The issue might be with your local equipment.',
    'router': 'Router problems can often be fixed with a simple restart. Unplug your router for 30 seconds, then plug it back in. Wait 2-3 minutes for it to fully boot up. Does this help?',
    'technician': 'I can schedule a technician visit for you. Our next available slot is tomorrow between 2-4 PM. The technician will diagnose and fix any hardware issues. Would you like me to book this?',
    'default': 'I understand your concern. Can you provide more details about the specific issue you\'re experiencing? For example, are you having trouble with speed, connectivity, or something else?'
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (keyword !== 'default' && message.includes(keyword)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0a0a0a', '#111111']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <Bot color="#00ffff" size={32} />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>AURA AI SUPPORT</Text>
              <Text style={styles.headerStatus}>● ONLINE</Text>
            </View>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.isUser ? styles.userMessageWrapper : styles.botMessageWrapper,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userMessage : styles.botMessage,
                  ]}
                >
                  <LinearGradient
                    colors={
                      message.isUser
                        ? ['#003366', '#0066cc']
                        : ['#1a1a1a', '#2d2d2d']
                    }
                    style={styles.messageGradient}
                  >
                    <View style={styles.messageHeader}>
                      {message.isUser ? (
                        <User color="#ffffff" size={16} />
                      ) : (
                        <Bot color="#00ffff" size={16} />
                      )}
                      <Text style={styles.messageTime}>
                        {formatTime(message.timestamp)}
                      </Text>
                    </View>
                    <Text style={styles.messageText}>{message.text}</Text>
                  </LinearGradient>
                </View>
              </View>
            ))}

            {isTyping && (
              <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
                <View style={[styles.messageBubble, styles.botMessage]}>
                  <LinearGradient
                    colors={['#1a1a1a', '#2d2d2d']}
                    style={styles.messageGradient}
                  >
                    <View style={styles.messageHeader}>
                      <Bot color="#00ffff" size={16} />
                      <Text style={styles.messageTime}>typing...</Text>
                    </View>
                    <Text style={styles.typingText}>● ● ●</Text>
                  </LinearGradient>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#1a1a1a', '#2d2d2d']}
              style={styles.inputGradient}
            >
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message..."
                placeholderTextColor="#666666"
                multiline
                maxLength={500}
                onSubmitEditing={sendMessage}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled,
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <Send
                  color={inputText.trim() ? '#00ffff' : '#666666'}
                  size={20}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  headerStatus: {
    fontSize: 12,
    color: '#00ff00',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  userMessage: {
    borderWidth: 1,
    borderColor: '#0066cc',
  },
  botMessage: {
    borderWidth: 1,
    borderColor: '#333333',
  },
  messageGradient: {
    padding: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  messageTime: {
    fontSize: 10,
    color: '#999999',
    marginLeft: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  messageText: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  typingText: {
    fontSize: 14,
    color: '#00ffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  inputContainer: {
    padding: 20,
    paddingTop: 10,
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    maxHeight: 100,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
