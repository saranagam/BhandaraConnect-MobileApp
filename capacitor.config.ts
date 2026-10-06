import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bhandaraconnect.app',
  appName: 'BhandaraConnect',
  // App auth runs on the hosted Next.js server (Clerk). Local `out/` is unused while server.url is set.
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