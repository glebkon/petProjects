// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "c25f370639abd4f394af",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "c0b82f678ca87b88f565450e52744e8bade42cdd"  
}

module.exports = config;
