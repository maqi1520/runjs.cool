const withPWA = require("next-pwa");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: !process.env.ENABLE_PWA && !prod,
    register: false,
    skipWaiting: false,
    publicExcludes: ["!noprecache/**/*", "!vendor/**/*"],
  },
  env: {
    COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || null,
    PKG_VERSION: require("./package.json").version,
  },
  webpack(config, { dev, isServer }) {
    // Replace React with Preact in client production build
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: "preact/compat",
    //     "react-dom/test-utils": "preact/test-utils",
    //     "react-dom": "preact/compat",
    //   });
    // }

    config.experiments = config.experiments || {};
    Object.assign(config.experiments, {
      asyncWebAssembly: true,
    });

    config.module.rules
      .filter((rule) => rule.oneOf)
      .forEach((rule) => {
        rule.oneOf.forEach((r) => {
          if (
            r.issuer &&
            r.issuer.and &&
            r.issuer.and.length === 1 &&
            r.issuer.and[0].source &&
            r.issuer.and[0].source.replace(/\\/g, "") ===
              path.resolve(process.cwd(), "src/pages/_app")
          ) {
            r.issuer.or = [
              ...r.issuer.and,
              /[\\/]node_modules[\\/]monaco-editor[\\/]/,
            ];
            delete r.issuer.and;
          }
        });
      });

    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: [
            "json",
            "markdown",
            "css",
            "typescript",
            "javascript",
            "html",
            "graphql",
            "python",
            "scss",
            "yaml",
          ],
          filename: "static/[name].worker.js",
        })
      );
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);
