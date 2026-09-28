/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows building outside OneDrive-synced folders on Windows:
  // NEXT_DIST_DIR=C:\Users\Persh\AppData\Local\Temp\opencode\taskflow-next npm run build
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
};

export default nextConfig;
