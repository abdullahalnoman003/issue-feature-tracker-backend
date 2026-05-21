import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection,
});

export const DBInit = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'contributor' CHECK(role IN ('contributor','maintainer')),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(200) NOT NULL CHECK(LENGTH(description)>=20),
        type VARCHAR(50) CHECK(type IN ('bug','feature_request')) ,
        status VARCHAR(50) DEFAULT 'open' CHECK(status IN ('open','in_progress','resolved')),
        reporter_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW() )
        `);
        console.log("Database Initialized");
  } catch (error) {
    console.error(error);
  }
};
