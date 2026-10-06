const { Pool } = require("pg");

const sslEnabled = String(process.env.DATABASE_SSL || "false").toLowerCase() === "true";
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (sslEnabled) {
  poolConfig.ssl = {
    rejectUnauthorized: false
  };
}

const pool = new Pool(poolConfig);

pool.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;