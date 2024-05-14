/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
        config.resolve.fallback = { fs: false, module: false, v8: false, perf_hooks: false}
        return config
    },
};

export default nextConfig;
