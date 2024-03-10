// Import the withHydrationOverlay function using ESM syntax
import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

// Define your Next.js configuration
const nextConfig = {
  // Your other Next.js configurations go here
};

// Apply withHydrationOverlay to enhance the nextConfig object
export default withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig);