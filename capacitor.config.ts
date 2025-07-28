import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'capgoTestVueApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'https://example.com/*',
      'https://google.com/*',
      'https://capgo.app/*',
      'https://sign-sandbox.farashenasa.ir/*',
      'http://localhost:*',
      'http://127.0.0.1:*'
    ]
  },
  plugins: {
    extConfig: {},
    EdgeToEdge: {
      backgroundColor: '#ffffff'
    },
    // Add InAppBrowser configuration
    InAppBrowser: {
      // Configure allowed domains
      allowedDomains: [
        'example.com',
        'google.com',
        'capgo.app',
        'sign-sandbox.farashenasa.ir'
      ],
      // Enable JavaScript execution for these domains
      enableJavaScript: true,
      // Configure security settings
      securitySettings: {
        allowArbitraryLoads: true,
        allowLocalNetworking: true
      }
    }
  }
};

export default config;
