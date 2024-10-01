const cors = require("cors");

const corsConfig = () => {
  return cors({
    // origin: process.env.CLIENT_URL,
    origin: "*",
    credentials: true,
  });
};

module.exports = corsConfig;
