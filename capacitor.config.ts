import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bhandaraconnect.app',
  appName: 'BhandaraConnect',
  webDir: 'out',

  server: {
    url: 'https://bhandaraconnect.vercel.app',
    cleartext: false
  },

  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#f97316'
    }
  }
};

export default config;