import pg from 'pg';

const { Pool } = pg;

let pool;

const createPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
    });
  }
  return pool;
};

export const getPool = () => {
  return createPool();
};
