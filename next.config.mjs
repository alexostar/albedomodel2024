import { build } from 'velite';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // othor next config here...
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hlkyrtglhpmrhzudaqzu.supabase.co',
      },
    ],
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options); // start velite
    });
  }
}
