// Simulated API service for AURA-Lite
// In a real app, these would make actual HTTP requests

export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  reply: string;
  type: 'text' | 'action';
}

export interface TechLocation {
  lat: number;
  lng: number;
  eta: string;
  status: string;
}

export interface IssueLog {
  issue_id: string;
  steps_completed: number;
}

class APIService {
  private baseUrl = 'https://api.aura-lite.com'; // Simulated endpoint

  // POST /api/chat - AI Chat Interface
  async sendChatMessage(message: ChatMessage): Promise<ChatResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userMessage = message.message.toLowerCase();
    
    // Keyword matching logic
    if (userMessage.includes('slow') || userMessage.includes('speed')) {
      return {
        reply: 'I see you\'re experiencing slow internet speeds. Let me help you with that. First, can you tell me what speed you\'re currently getting? You can run a speed test to check.',
        type: 'text'
      };
    }
    
    if (userMessage.includes('connection') || userMessage.includes('connect')) {
      return {
        reply: 'Connection problems can be frustrating. Let\'s check: 1) Are all cables securely connected? 2) Is your router powered on? 3) Can you see your WiFi network in available networks?',
        type: 'text'
      };
    }
    
    if (userMessage.includes('wifi') || userMessage.includes('wireless')) {
      return {
        reply: 'WiFi issues are common. Try: 1) Forget and reconnect to your network, 2) Restart your device\'s WiFi, 3) Check if you\'re using the correct password. Are you able to see your network?',
        type: 'text'
      };
    }
    
    if (userMessage.includes('outage') || userMessage.includes('down')) {
      return {
        reply: 'Let me check for any service outages in your area. Based on our current data, there are no reported outages. The issue might be with your local equipment.',
        type: 'text'
      };
    }
    
    if (userMessage.includes('router') || userMessage.includes('modem')) {
      return {
        reply: 'Router problems can often be fixed with a simple restart. Unplug your router for 30 seconds, then plug it back in. Wait 2-3 minutes for it to fully boot up. Does this help?',
        type: 'text'
      };
    }
    
    if (userMessage.includes('technician') || userMessage.includes('tech') || userMessage.includes('visit')) {
      return {
        reply: 'I can schedule a technician visit for you. Our next available slot is tomorrow between 2-4 PM. The technician will diagnose and fix any hardware issues. Would you like me to book this?',
        type: 'action'
      };
    }

    // Default response
    return {
      reply: 'I understand your concern. Can you provide more details about the specific issue you\'re experiencing? For example, are you having trouble with speed, connectivity, or something else?',
      type: 'text'
    };
  }

  // GET /api/tech-location - Technician Location Tracking
  async getTechnicianLocation(): Promise<TechLocation> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate moving technician
    const baseTime = Date.now();
    const minutesElapsed = Math.floor((baseTime % 900000) / 60000); // 15 minute cycle
    const eta = Math.max(1, 15 - minutesElapsed);

    return {
      lat: 37.7749 + (Math.random() - 0.5) * 0.01,
      lng: -122.4194 + (Math.random() - 0.5) * 0.01,
      eta: `${eta} minutes`,
      status: eta > 5 ? 'en_route' : eta > 1 ? 'arrived' : 'working'
    };
  }

  // POST /api/log-issue - Log Self-Help Completion
  async logIssue(issueData: IssueLog): Promise<{ success: boolean; ticket_id: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    console.log('Issue logged:', issueData);

    return {
      success: true,
      ticket_id: `TKT-${Date.now()}`
    };
  }

  // Additional utility methods for the demo
  async getServiceStatus(): Promise<{ status: string; uptime: string }> {
    return {
      status: 'operational',
      uptime: '99.9%'
    };
  }

  async scheduleAppointment(timeSlot: string): Promise<{ success: boolean; appointment_id: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      appointment_id: `APT-${Date.now()}`
    };
  }
}

export const apiService = new APIService();
