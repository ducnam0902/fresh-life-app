export const COLORS = {
  colors: {
    primary: "#00E676",       // The vibrant neon green used for buttons and active states
    background: "#0A0A0A",    // The deep black main background
    surface: "#1C1C1E",       // Dark gray for cards and input fields
    surfaceLight: "#2C2C2E",
    error: "#ff453a",
    info: "#007AFF",
    warning: "#FFB84D",
    orangeColor: "#FF8000",
    aqua: "#7FFFD4",
    brown: "#FFDEAD",
    gold: "#FFD700",
    springGreen: "#00FF7F",
    orangeRed: "#FF4500",
    text: {
      primary: "#FFFFFF",     // Pure white for headings and main titles
      secondary: "#8E8E93",   // Medium gray for subtext and timestamps
      muted: "#48484A",       // Darker gray for inactive icons or placeholders
      onPrimary: "#000000"    // Black text used on the green buttons
    },
    border: "#3A3A3C"         // Subtle borders for section dividers
  },

  typography: {
    fontFamily: "'SF Pro Display', 'Inter', -apple-system, sans-serif",
    fontSize: {
      h1: 27,       // "Screenify" branding / "Screnax" title
      h2: 18,          // "Messages", "Settings", "Add Person"
      bodyLarge: 17,      // Names in chat list (Juanita, Esther)
      bodyMedium: 15,     // Regular UI text and button labels
      caption: 13,        // Timestamps and "Why Go PRO?" bullets
      tiny: 11        // "Popular" / "Advantageous" tags
    },
    fontWeight: {
      bold: "700",
      medium: "500",
      regular: "400"
    }
  },

  layout: {
    borderRadius: {
      button: "24px",         // Large rounded corners for the "Lest go" button
      card: "18px",           // Soft corners for message containers
      avatar: "50%"           // Circular profile pictures
    },
    spacing: {
      padding: 16,        // Standard screen padding
      gap: 12      // Gap between chat items
    }
  },

  effects: {
    glassmorphism: "rgba(255, 255, 255, 0.05)", // Used for subtle overlays
    shadow: "0px 4px 20px rgba(0, 0, 0, 0.5)"
  }
};