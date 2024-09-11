import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the Next.js configuration
const nextConfig = {
  webpack(config) {
    config.resolve.alias['redux-persist'] = path.resolve(__dirname, 'node_modules/redux-persist');
    return config;
  },
};

export default nextConfig;