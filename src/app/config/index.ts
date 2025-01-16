const config = {
  uploadDirectory: process.env.UPLOAD_DIR || "public/surgical-session",
  omeApiBaseUrl: "http://localhost:8081/v1/vhosts/default/apps/app",
  omeApiSecret: "sridhar:ome@2024",
};

export default config;
