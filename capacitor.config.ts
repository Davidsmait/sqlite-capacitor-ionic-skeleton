import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sqlite-ionic-capacitor',
  webDir: 'www',
  plugins: {
    CapacitorSQLite: {
      iosIsEncryption: true,
    }
  }
};

export default config;
