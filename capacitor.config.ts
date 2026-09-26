import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bhandaraconnect.app',
  appName: 'BhandaraConnect',
  webDir: 'out',
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#f97316'
    }
  }
};

export default config;
