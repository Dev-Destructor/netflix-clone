// Using next-transpile-modules
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["rb.gy", "image.tmdb.org"],
    dangerouslyAllowSVG: true,
  }
});
