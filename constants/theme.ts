// Cyberpunk theme constants for AURA-Lite

export const CyberpunkTheme = {
  colors: {
    // Primary colors
    primary: '#00ffff',      // Cyan
    secondary: '#ff0080',    // Magenta
    accent: '#00ff00',       // Green
    
    // Background colors
    background: '#000000',   // Pure black
    surface: '#0a0a0a',      // Very dark gray
    card: '#111111',         // Dark gray
    
    // Text colors
    text: '#ffffff',         // White
    textSecondary: '#cccccc', // Light gray
    textMuted: '#666666',    // Medium gray
    
    // Status colors
    success: '#00ff00',      // Green
    warning: '#ffff00',      // Yellow
    error: '#ff0080',        // Magenta
    info: '#00ffff',         // Cyan
    
    // Transparent overlays
    overlay: 'rgba(0, 0, 0, 0.8)',
    cardOverlay: 'rgba(255, 255, 255, 0.05)',
    
    // Gradients
    gradients: {
      primary: ['#000000', '#0a0a0a', '#111111'],
      cyan: ['#001a1a', '#002626', '#003333'],
      magenta: ['#1a0033', '#330066', '#4d0099'],
      green: ['#001a00', '#003300', '#004d00'],
      card: ['#1a1a1a', '#2d2d2d'],
    },
  },
  
  fonts: {
    mono: 'Courier New', // Monospace font for cyberpunk feel
    regular: 'System',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 50,
  },
  
  shadows: {
    glow: {
      shadowColor: '#00ffff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    glowMagenta: {
      shadowColor: '#ff0080',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    glowGreen: {
      shadowColor: '#00ff00',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
  },
  
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
  },
};

export type Theme = typeof CyberpunkTheme;
